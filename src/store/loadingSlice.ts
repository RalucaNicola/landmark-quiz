import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppLoadingStatus {
  viewLoaded?: boolean;
  questionsLoaded?: boolean;
}

const initialState = {
  viewLoaded: false,
  questionsLoaded: false
} as AppLoadingStatus;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setViewLoaded(state, param: PayloadAction<boolean>) {
      state.viewLoaded = param.payload;
    },
    setQuestionsLoaded(state, param: PayloadAction<boolean>) {
      state.questionsLoaded = param.payload;
    }
  }
});

export const { setViewLoaded, setQuestionsLoaded } = loadingSlice.actions;
export default loadingSlice.reducer;
