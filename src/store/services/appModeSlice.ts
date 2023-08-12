import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AppMode {
    Explore,
    Question,
    Menu
}

const initialState = AppMode.Menu;

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