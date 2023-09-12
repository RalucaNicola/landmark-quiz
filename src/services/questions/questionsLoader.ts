import { AppDispatch } from '../../store/storeConfiguration';
import { setQuestionsData } from './questionsInterface';
import { setError } from '../../store/errorSlice';
import { setLoadingStatus } from '../loader';

export const fetchQuestions = () => async (dispatch: AppDispatch) => {
  try {
    const questionsResponse = await fetch('./data/questions.json')
    const questionsData = await questionsResponse.json();
    console.log(questionsData);
    if (questionsData) {
      setQuestionsData(questionsData);
      dispatch(setLoadingStatus({ questionsLoaded: true }));
    }
  } catch (error) {
    dispatch(
      setError({
        message: error.message,
        name: 'There was an error while loading questions.'
      })
    );
  }
};
