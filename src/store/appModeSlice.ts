import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AppMode {
    Load,
    Intro,
    TravelToQuestion,
    AskQuestion,
    AnswerQuestion
}

const initialState = AppMode.Load;

const appModeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode(state, param: PayloadAction<AppMode>) {
            return param.payload;
        },
    }
});

export const { setMode } = appModeSlice.actions;
export default appModeSlice.reducer;