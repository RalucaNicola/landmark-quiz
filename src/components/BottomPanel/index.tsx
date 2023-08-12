import * as styles from './BottomPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteAction } from '@esri/calcite-components-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import CountriesMenu from '../CountriesMenu';
import { useAppSelector } from '../../hooks/useAppSelector';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInfoModalOptions } from '../../store/services/modal-options/modalSlice';
import { AppMode, setMode } from '../../store/services/appModeSlice';
import { selectRandomLandmark } from '../../store/services/landmark-selection/landmarkSelectionThunk';
import { Landmark } from '../../store/services/landmark-selection/landmarkSelectionSlice';

interface CorrectAnswer {
  value: boolean;
}

const BottomPanel = () => {
  const dispatch = useAppDispatch();
  const appLoaded = useAppSelector((state) => state.loading.viewLoaded && state.loading.questionsLoaded);
  const selectedLandmark = useAppSelector((state) => state.landmarkSelection);
  const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswer | null>(null);
  const renderIntro = () => <>
    <p>Learn about landmarks around the world by answering questions</p>
    <div className={styles.buttons}>
      <button className={styles.menuButton} onClick={() => { dispatch(setMode(AppMode.Explore)); setCorrectAnswer(null); }}>Explore map</button>
      <button className={styles.menuButton} onClick={() => { dispatch(setMode(AppMode.Question)); setCorrectAnswer(null); dispatch(selectRandomLandmark()); }}>Go to random landmark</button>
    </div></>;

  const renderLoading = () => (<>Loading...</>);



  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {selectedLandmark.id ?
          <>
            <p>{selectedLandmark.question}</p>
            {selectedLandmark.options.map((option: string, index) =>
              <div key={index} className={correctAnswer ? styles.noPointerEvents : ''}>
                <input onClick={() => { if (index === selectedLandmark.answer) { setCorrectAnswer({ value: true }) } else { setCorrectAnswer({ value: false }) } }} type='radio' name="answer-option" id={`option-${index}`} />
                <label htmlFor={`option-${index}`}>
                  {option}
                </label>
              </div>
            )}
            {correctAnswer ? correctAnswer.value ? <p>You got it right! {selectedLandmark.explanation}</p> : <p>This time it's wrong. {selectedLandmark.explanation}</p> : null}
          </> :
          appLoaded ? renderIntro() : renderLoading()}
      </div>

    </div>
  );
};

export default BottomPanel;
