import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for admin login
export const adminAuth = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/admins/login/`, formData);
      const data = response.data;
      localStorage.setItem('authToken', data.token.access);
      return data;
    } catch (error) {
      console.error('Error in adminLogin:', error);
      throw rejectWithValue(error.message);
    }
  }
);