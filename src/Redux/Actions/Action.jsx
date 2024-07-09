import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const authToken = JSON.parse(localStorage.getItem('authToken'));

export const fetchAllTeachers = createAsyncThunk(
  'teachers/fetchall',
  async (_, { rejectWithValue }) => {

    try {
      if (!authToken || !authToken.access) {
        throw new Error('Auth token not found');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken.access}`,
        },
      };
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/admins/teachers/`, config);
      console.log("daaa", response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchAllTeachers:', error);
      return rejectWithValue(error.message);
    }

  }
)