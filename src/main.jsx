import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer.js';
import threadReducer from './reducers/threadReducer.js';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer.js';
import filterReducer from './reducers/filterReducer.js';
import imageReducer from './reducers/imageReducer.js';
import pageReducer from './reducers/pageReducer.js';

//redux toolkit
const store = configureStore({
  reducer: {
    login: loginReducer,
    thread: threadReducer,
    users: userReducer,
    filter: filterReducer,
    images: imageReducer,
    page: pageReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
