import * as styles from './BottomPanel.module.css';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppMode, setMode } from '../../store/appModeSlice';
import { selectRandomLandmark } from '../../services/landmarkSelection';
import { increaseQuestionsAnswered } from '../../store/questionManagerSlice';
import { setSelectedLandmark } from '../../store/landmarkSelectionSlice';
import { motion } from 'framer-motion';
import { getRandomPhrase } from '../../utils/randomPhrases';
import { CalciteLabel, CalciteRadioButton, CalciteRadioButtonGroup } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import '@esri/calcite-components/dist/components/calcite-label';

const SPRING = { type: 'spring', stiffness: 400, damping: 20 };

const BottomPanel = () => {
  const dispatch = useAppDispatch();
  const appMode = useAppSelector((state) => state.appMode);
  const selectedLandmark = useAppSelector((state) => state.landmarkSelection);
  const gameFinished = useAppSelector((state) => state.questionManager.gameFinished);
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
            <div className={styles.next}>
              <motion.button
                className={styles.roundButton}
                whileHover={{ scale: 1.2 }}
                transition={SPRING}
                onClick={() => {
                  dispatch(setMode(AppMode.TravelToQuestion));
                  dispatch(selectRandomLandmark());
                }}
              >
                <img style={{ width: '50%' }} src='./assets/quiz-icon.png'></img>
              </motion.button>
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
      <motion.div layout className={styles.card}>
        <motion.div layout='position'>
          {selectedLandmark.id ? (
            <>
              <p className={styles.question}>{selectedLandmark.question}</p>
              <CalciteRadioButtonGroup
                name='AnswerOptions'
                layout='vertical'
                disabled={correctAnswer !== null ? true : undefined}
              >
                {selectedLandmark.options.map((option: string, index) => (
                  <CalciteLabel layout='inline' key={index}>
                    <CalciteRadioButton
                      value={index}
                      onCalciteRadioButtonChange={(evt) => {
                        if (evt.target.value === selectedLandmark.answer) {
                          setCorrectAnswer(true);
                          dispatch(increaseQuestionsAnswered({ correct: true }));
                        } else {
                          setCorrectAnswer(false);
                          dispatch(increaseQuestionsAnswered({ correct: false }));
                        }
                        dispatch(setMode(AppMode.AnswerQuestion));
                      }}
                    ></CalciteRadioButton>
                    {option}
                  </CalciteLabel>
                ))}
              </CalciteRadioButtonGroup>
              {appMode === AppMode.AnswerQuestion ? (
                <>
                  {correctAnswer ? (
                    <>
                      <p className={styles.answer}>{getRandomPhrase('correctAnswer')}</p>
                      <p className={styles.explanation}>{selectedLandmark.explanation}</p>
                    </>
                  ) : (
                    <>
                      <p className={styles.answer}>{getRandomPhrase('wrongAnswer')}</p>
                      <p className={styles.explanation}>{selectedLandmark.explanation}</p>
                    </>
                  )}
                  {!gameFinished && (
                    <div className={styles.next}>
                      <motion.button
                        className={styles.roundButton}
                        transition={SPRING}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => {
                          dispatch(setMode(AppMode.TravelToQuestion));
                          setCorrectAnswer(null);
                          dispatch(setSelectedLandmark({ id: null }));
                          dispatch(selectRandomLandmark());
                        }}
                      >
                        <img style={{ width: '50%' }} src='./assets/arrow-next.png'></img>
                      </motion.button>
                    </div>
                  )}
                </>
              ) : null}
            </>
          ) : (
            renderCardContainer()
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BottomPanel;
