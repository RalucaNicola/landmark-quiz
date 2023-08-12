import { Mesh } from '@arcgis/core/geometry';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Landmark {
  id: number | null;
  question?: string | null;
  answer?: number | null;
  options?: string[] | null;
  explanation?: string | null;
}

const initialState = {
  id: null
} as Landmark;

const landmarkSlice = createSlice({
  name: 'landmarkSelection',
  initialState,
  reducers: {
    setSelectedLandmark(state, param: PayloadAction<Landmark>) {
      state.id = param.payload.id;
      state.question = param.payload.question;
      state.answer = param.payload.answer;
      state.options = param.payload.options;
      state.explanation = param.payload.explanation;
    }
  }
});

export const { setSelectedLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
