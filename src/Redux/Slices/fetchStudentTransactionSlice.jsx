import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentTransactions } from "../Actions/Action";



const initialState = {
  transactions: [],
  loading: false,
  error: null,
}

const fetchStudentTransactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload; 
      })
      .addCase(fetchStudentTransactions.rejected, (state, action) => {
        state.loading = false;  
        state.error = action.payload;
      })
  },
})

export default fetchStudentTransactionSlice.reducer;
export const selectStudentTransactions = (state) => state.transactions.transactions; 
