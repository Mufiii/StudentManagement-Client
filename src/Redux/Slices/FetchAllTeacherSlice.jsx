import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTeachers } from "../Actions/Action";

const initialState = {
  teachers: [],
  loading: false,
  error: null,
}

const fetchAllTeacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllTeachers
      .addCase(fetchAllTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload; // Corrected from state.workspaces
      })
      .addCase(fetchAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchAllTeacherSlice.reducer;
export const selectTeachers = (state) => state.teachers.teachers; // Updated to access state.teachers correctly
