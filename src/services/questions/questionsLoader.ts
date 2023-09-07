import { AppDispatch } from '../../store/storeConfiguration';
import { setQuestionsLoaded } from '../../store/loadingSlice';
import { setQuestionsData } from './questionsInterface';
import { setError } from '../../store/errorSlice';

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
