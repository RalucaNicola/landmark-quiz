import * as styles from './BottomPanel.module.css';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppMode, setMode } from '../../store/appModeSlice';
import { selectRandomLandmark } from '../../services/landmarkSelection';
import { increaseQuestionsAnswered } from '../../store/questionManagerSlice';
import { setSelectedLandmark } from '../../store/landmarkSelectionSlice';

interface CorrectAnswer {
  value: boolean;
}

const BottomPanel = () => {
  const dispatch = useAppDispatch();
  const appMode = useAppSelector((state) => state.appMode);
  const selectedLandmark = useAppSelector((state) => state.landmarkSelection);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

  const renderCardContainer = () => {
    let content = null;
    switch (appMode) {
      case AppMode.Load:
        content = <>Loading...</>;
        break;
      case AppMode.Intro:
        content = (
          <>
            <p>Learn about landmarks around the world by answering questions</p>
            <div className={styles.buttons}>
              <button
                className={styles.menuButton}
                onClick={() => {
                  dispatch(setMode(AppMode.TravelToQuestion));
                  dispatch(selectRandomLandmark());
                }}
              >
                Go to random landmark
              </button>
            </div>
          </>
        );
        break;
      case AppMode.TravelToQuestion:
        content = <p>Let's see where this journey takes us!</p>;
        break;
    }
    return content;
  };

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
                      setCorrectAnswer(true);
                      dispatch(increaseQuestionsAnswered({ correct: true }));
                    } else {
                      setCorrectAnswer(false);
                      dispatch(increaseQuestionsAnswered({ correct: false }));
                    }
                    dispatch(setMode(AppMode.AnswerQuestion));
                  }}
                  type='radio'
                  name='answer-option'
                  id={`option-${index}`}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
            {appMode === AppMode.AnswerQuestion ? (
              <div>
                {correctAnswer ? (
                  <p>You got it right! {selectedLandmark.explanation}</p>
                ) : (
                  <p>This time it's wrong. {selectedLandmark.explanation}</p>
                )}
                <button
                  onClick={() => {
                    dispatch(setMode(AppMode.TravelToQuestion));
                    setCorrectAnswer(null);
                    dispatch(setSelectedLandmark({ id: null }));
                    dispatch(selectRandomLandmark());
                  }}
                >
                  Next question
                </button>
              </div>
            ) : null}
          </>
        ) : (
          renderCardContainer()
        )}
      </div>
    </div>
  );
};

export default BottomPanel;
