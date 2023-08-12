import { AppDispatch } from '../../storeConfiguration';
import { setQuestionsLoaded } from '../app-loading/loadingSlice';
import { setQuestionsData } from './questionsInterface';
import { setError } from '../error-messaging/errorSlice';

export const fetchQuestions = () => async (dispatch: AppDispatch) => {
  try {
    const questionsResponse = await fetch('./data/questions.json')
    const questionsData = await questionsResponse.json();
    console.log(questionsData);
    if (questionsData) {
      setQuestionsData(questionsData);
      dispatch(setQuestionsLoaded(true));
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
