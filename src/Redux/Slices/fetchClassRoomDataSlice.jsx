import { createSlice } from "@reduxjs/toolkit";
import { fetchClassRoomData } from "../Actions/Action";



const initialState = {
  classroomData: [],
  loading: false,
  error: null,
}

const fetchAllClassroomsDataSlice = createSlice({
  name: 'classroomData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllTeachers
      .addCase(fetchClassRoomData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassRoomData.fulfilled, (state, action) => {
        state.loading = false;
        state.classroomData = action.payload; 
      })
      .addCase(fetchClassRoomData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchAllClassroomsDataSlice.reducer;
export const selectClassRoomsData = (state) => state.classroomData.classroomData; 
