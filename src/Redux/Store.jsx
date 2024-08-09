import { combineReducers, configureStore } from "@reduxjs/toolkit";
import FetchAllTeacherSlice from "./Slices/FetchAllTeacherSlice";
import FetchAllClassroomSlice from "./Slices/FetchAllClassroomSlice";
import StudentDataSlice from "./Slices/StudentDataSlice";
import fetchBusDataSlice from "./Slices/fetchBusDataSlice";
import FetchBusRouteSlice from "./Slices/FetchBusRouteSlice";
import fetchBuspointsSlice from "./Slices/fetchBuspointsSlice";
import FetchBusDetailSlice from "./Slices/FetchBusDetailSlice";
import FetchSpeceficTeacherSlice from "./Slices/FetchSpeceficTeacherSlice.jsx";
import fetchStudentTransactionSlice from "./Slices/fetchStudentTransactionSlice.jsx";
import fetchClassRoomDataSlice from "./Slices/fetchClassRoomDataSlice.jsx";

const rootReducer = combineReducers({
    teachers: FetchAllTeacherSlice,
    classrooms: FetchAllClassroomSlice,
    classroomData:fetchClassRoomDataSlice,
    student: StudentDataSlice,
    bus: fetchBusDataSlice,
    routes: FetchBusRouteSlice,
    buspoints: fetchBuspointsSlice,
    schoolbusData: FetchBusDetailSlice,
    teacher: FetchSpeceficTeacherSlice,
    transactions: fetchStudentTransactionSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
