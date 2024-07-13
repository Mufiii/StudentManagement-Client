import { createSlice } from "@reduxjs/toolkit";
import { fetchSchoolBusPoints } from "../Actions/Action";



const initialState = {
  buspoints: [],
  loading: false,
  error: null,
}

const fetchBusDataSlice = createSlice({
  name: 'buspoints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(fetchSchoolBusPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolBusPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.buspoints = action.payload; 
      })
      .addCase(fetchSchoolBusPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchBusDataSlice.reducer;
export const selectBusPoints = (state) => state.buspoints.buspoints; 
