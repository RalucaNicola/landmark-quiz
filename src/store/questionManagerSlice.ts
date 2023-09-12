
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTotalNumberOfLandmarks } from '../services/questions/questionsInterface';

export interface QuestionManager {
  questionsAnswered: number,
  correctQuestions: number
  gameFinished: boolean;
}

const initialState = {
  questionsAnswered: 0,
  correctQuestions: 0,
  gameFinished: false
} as QuestionManager;

const questionManagerSlice = createSlice({
  name: 'questionManager',
  initialState,
  reducers: {
    increaseQuestionsAnswered(state, param: PayloadAction<{ correct: boolean }>) {
      const questionsAnswered = state.questionsAnswered + 1;
      if (param.payload.correct) {
        state.correctQuestions++;
      }
      if (questionsAnswered === getTotalNumberOfLandmarks()) {
        state.gameFinished = true;
      }
      state.questionsAnswered = questionsAnswered;
    },
  }
});

export const { increaseQuestionsAnswered } = questionManagerSlice.actions;
export default questionManagerSlice.reducer;
