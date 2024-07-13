import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import FetchAllTeacherSlice from "./Slices/FetchAllTeacherSlice"
import FetchAllClassroomSlice from "./Slices/FetchAllClassroomSlice"
import StudentDataSlice from "./Slices/StudentDataSlice"
import fetchBusDataSlice from "./Slices/fetchBusDataSlice"
import FetchBusRouteSlice from "./Slices/FetchBusRouteSlice"
import fetchBuspointsSlice from "./Slices/fetchBuspointsSlice"


const rootreducer = combineReducers({
   teachers:FetchAllTeacherSlice,
   classrooms:FetchAllClassroomSlice,
   student:StudentDataSlice,
   bus:fetchBusDataSlice,
   routes:FetchBusRouteSlice,
   buspoints:fetchBuspointsSlice,
})

const persistConfig = {
    key:'root',
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig,rootreducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck:false
    })
    
})

export const persistor = persistStore(store) 