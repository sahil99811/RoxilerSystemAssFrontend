import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import rootReducer from './reducer';
const store = configureStore({
  reducer:rootReducer,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
     <Toaster/>
     <App />
    </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

