
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchAllTeachers = createAsyncThunk(
  'teachers/fetchall',
  async (_, { rejectWithValue }) => {

    try {

      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}admins/teachers/`);
      console.log("daaa", response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchAllTeachers:', error);
      return rejectWithValue(error.message);
    }

  }
)


export const fetchSpeceficTeacherData = createAsyncThunk(
  'teachers/SpeceficTeachers',
  async (teacherId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}admins/teachers/${teacherId}`);
      console.log("daaa", response.data);
      return response.data;
    } catch (error) {
      console.error('Error in SpeceficTeacher:', error);
      return rejectWithValue(error.message);
    }

  }
)


export const fetchAllClassRooms = createAsyncThunk(
  'classroom/fetchAll',
  async (grade, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}admins/classroom/?grade=${grade}`);
      console.log("classrooms", response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchAllClassRooms:', error);
      return rejectWithValue(error.message);
    }
  }
);




export const fetchClassRoomData = createAsyncThunk(
  'classroom/fetchData',
  async (classroomId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}admins/classroom/${classroomId}`);
      console.log("classroomData", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('Workspace not found');
        return rejectWithValue('Workspace not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching workspace data');
      }
    }

  }
);




export const fetchStudentData = createAsyncThunk(
  'student/fetchStudentData',
  async (studentId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}students/studentDetail/${studentId}`);
      console.log("students", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('student not found');
        return rejectWithValue('student not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching student data');
      }
    }


  }
);

// fetchAllBuses
export const fetchSchoolBus = createAsyncThunk(
  'fetch/schoolbus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}bus/bus/`);
      console.log("bus", response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchAllBuses:', error);
      return rejectWithValue(error.message);
    }

  }
);



export const fetchSchoolBusRoutes = createAsyncThunk(
  'fetch/schoolbusRoutes',
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}bus/routes/`);
      console.log("routes", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('route not found');
        return rejectWithValue('route not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching busroutes data');
      }
    }

  }
);



export const fetchSchoolBusPoints = createAsyncThunk(
  'fetch/schoolbusPoints',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}bus/buspoint/`);
      console.log("Bus Points", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('BusPoints not found');
        return rejectWithValue('BusPoints not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching BusPoints data');
      }
    }

  }
);



export const fetchSchoolBusData = createAsyncThunk(
  'Bus/fetchschoolBusData',
  async (schoolBusId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}bus/bus/${schoolBusId}`);
      console.log("students", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('schoolbus not found');
        return rejectWithValue('schoolbus not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching schoolbus data');
      }
    }

  }
);


export const fetchStudentTransactions = createAsyncThunk(
  'students/fetchStudentTransactionsDetails',
  async (user_id, { rejectWithValue }) => {
    try {


      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}teacher/transactions/`, {
        params: { user_id }, // Use query parameters
      });

      console.log("transactions", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('BusDetails not found');
        return rejectWithValue('schoolbus BusDetails not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching schoolbus data');
      }
    }
  }
);