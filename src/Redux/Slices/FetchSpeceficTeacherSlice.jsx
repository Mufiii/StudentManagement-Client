import { createSlice } from "@reduxjs/toolkit";
import { fetchSpeceficTeacherData } from "../Actions/Action";



const initialState = {
  teacher: [],
  loading: false,
  error: null,
}

const FetchSpeceficTeacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpeceficTeacherData.pending, (state) => {
        state.loading = true;
        state.teacher = null;
      })
      .addCase(fetchSpeceficTeacherData.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload; 
      })
      .addCase(fetchSpeceficTeacherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default FetchSpeceficTeacherSlice.reducer;
export const selectSpeceficTeacher = (state) => state.teacher.teacher; 
