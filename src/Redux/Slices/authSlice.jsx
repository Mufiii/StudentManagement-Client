import { createSlice } from "@reduxjs/toolkit";
import { adminAuth } from "../Actions/AuthActions";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Slice for auth reducer
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Example: If user data is returned
        state.error = null;
      })
      .addCase(adminAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;