import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentData } from "../Actions/Action";

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const StudentDataSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload; 
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default StudentDataSlice.reducer;
export const selectStudent = (state) => state.student.student;
