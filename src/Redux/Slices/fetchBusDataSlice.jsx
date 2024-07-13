import { createSlice } from "@reduxjs/toolkit";
import { fetchSchoolBus } from "../Actions/Action";



const initialState = {
  bus: [],
  loading: false,
  error: null,
}

const fetchBusDataSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolBus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolBus.fulfilled, (state, action) => {
        state.loading = false;
        state.bus = action.payload; 
      })
      .addCase(fetchSchoolBus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchBusDataSlice.reducer;
export const selectBusData = (state) => state.bus.bus; 
