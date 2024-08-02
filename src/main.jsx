import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store";
import axios from "axios";

let authToken = JSON.parse(localStorage.getItem('authToken'))

axios.interceptors.request.use((request)=>{
  console.log(request);
 if (authToken){
    request.headers.Authorization = `Bearer ${authToken.access}`
  }
return request;

})
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
           <App />
          </PersistGate>
        </Provider>
    </ThemeProvider>
  </React.StrictMode>
);