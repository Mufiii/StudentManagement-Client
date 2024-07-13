import { createSlice } from "@reduxjs/toolkit";
import { fetchSchoolBusRoutes } from "../Actions/Action";



const initialState = {
  routes: [],
  loading: false,
  error: null,
}

const fetchBusRouteSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolBusRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolBusRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routes = action.payload; 
      })
      .addCase(fetchSchoolBusRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default fetchBusRouteSlice.reducer;
export const selectBusRoutes = (state) => state.routes.routes; 
