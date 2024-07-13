import { createSlice } from "@reduxjs/toolkit";
import { fetchAllClassRooms } from "../Actions/Action";



const initialState = {
  classrooms: [],
  loading: false,
  error: null,
}

const fetchAllClassroomsSlice = createSlice({
  name: 'classrooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllTeachers
      .addCase(fetchAllClassRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClassRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload; // Corrected from state.workspaces
      })
      .addCase(fetchAllClassRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchAllClassroomsSlice.reducer;
export const selectClassRooms = (state) => state.classrooms.classrooms; 
