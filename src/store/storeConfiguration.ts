import { combineReducers, configureStore } from '@reduxjs/toolkit';
import landmarkSelectionReducer from './services/landmark-selection/landmarkSelectionSlice';
import loadingReducer from './services/app-loading/loadingSlice';
import errorReducer from './services/error-messaging/errorSlice';
import modalOptionsReducer from './services/modal-options/modalSlice';
import appModeReducer from './services/appModeSlice';

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  landmarkSelection: landmarkSelectionReducer,
  infoModal: modalOptionsReducer,
  appMode: appModeReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
