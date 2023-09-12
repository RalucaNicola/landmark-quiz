import { combineReducers, configureStore } from '@reduxjs/toolkit';
import landmarkSelectionReducer from './landmarkSelectionSlice';
import errorReducer from './errorSlice';
import modalOptionsReducer from './modalSlice';
import appModeReducer from './appModeSlice';
import questionManagerReducer from './questionManagerSlice';

const rootReducer = combineReducers({
  error: errorReducer,
  landmarkSelection: landmarkSelectionReducer,
  infoModal: modalOptionsReducer,
  appMode: appModeReducer,
  questionManager: questionManagerReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
