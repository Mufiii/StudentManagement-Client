import { createSlice } from "@reduxjs/toolkit";
import { fetchSchoolBusData } from "../Actions/Action";



const initialState = {
  schoolbusData: [],
  loading: false,
  error: null,
}

const fetchBusDetailSlice = createSlice({
  name: 'schoolbusData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(fetchSchoolBusData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolBusData.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolbusData = action.payload; 
      })
      .addCase(fetchSchoolBusData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchBusDetailSlice.reducer;
export const selectBusDetail = (state) => state.schoolbusData.schoolbusData; 
