import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage"
import FetchAllTeacherSlice from "./Slices/FetchAllTeacherSlice"


const rootreducer = combineReducers({
   teachers:FetchAllTeacherSlice
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