
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuestionManager {
  questionsAnswered: number,
  correctQuestions: number
  gameFinished: boolean
}

const initialState = {
  questionsAnswered: 0,
  correctQuestions: 0,
} as QuestionManager;

const questionManagerSlice = createSlice({
  name: 'questionManager',
  initialState,
  reducers: {
    increaseQuestionsAnswered(state, param: PayloadAction<{ correct: boolean }>) {
      state.questionsAnswered += 1;
      if (param.payload.correct) {
        state.correctQuestions++;
      }
    }
  }
});

export const { increaseQuestionsAnswered } = questionManagerSlice.actions;
export default questionManagerSlice.reducer;
