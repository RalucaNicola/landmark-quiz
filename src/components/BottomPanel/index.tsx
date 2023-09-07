import * as styles from './BottomPanel.module.css';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppMode, setMode } from '../../store/appModeSlice';
import { selectRandomLandmark } from '../../services/landmarkSelection';

interface CorrectAnswer {
  value: boolean;
}

const BottomPanel = () => {
  const dispatch = useAppDispatch();
  const appLoaded = useAppSelector((state) => state.loading.viewLoaded && state.loading.questionsLoaded);
  const selectedLandmark = useAppSelector((state) => state.landmarkSelection);
  const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswer | null>(null);
  const renderIntro = () => (
    <>
      <p>Learn about landmarks around the world by answering questions</p>
      <div className={styles.buttons}>
        <button
          className={styles.menuButton}
          onClick={() => {
            dispatch(setMode(AppMode.Explore));
            setCorrectAnswer(null);
          }}
        >
          Explore map
        </button>
        <button
          className={styles.menuButton}
          onClick={() => {
            dispatch(setMode(AppMode.Question));
            setCorrectAnswer(null);
            dispatch(selectRandomLandmark());
          }}
        >
          Go to random landmark
        </button>
      </div>
    </>
  );

  const renderLoading = () => <>Loading...</>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {selectedLandmark.id ? (
          <>
            <p>{selectedLandmark.question}</p>
            {selectedLandmark.options.map((option: string, index) => (
              <div key={index} className={correctAnswer ? styles.noPointerEvents : ''}>
                <input
                  onClick={() => {
                    if (index === selectedLandmark.answer) {
                      setCorrectAnswer({ value: true });
                    } else {
                      setCorrectAnswer({ value: false });
                    }
                  }}
                  type='radio'
                  name='answer-option'
                  id={`option-${index}`}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
            {correctAnswer ? (
              correctAnswer.value ? (
                <p>You got it right! {selectedLandmark.explanation}</p>
              ) : (
                <p>This time it's wrong. {selectedLandmark.explanation}</p>
              )
            ) : null}
          </>
        ) : appLoaded ? (
          renderIntro()
        ) : (
          renderLoading()
        )}
      </div>
    </div>
  );
};

export default BottomPanel;
