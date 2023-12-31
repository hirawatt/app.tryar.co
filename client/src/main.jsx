import React from 'react';
import ReactDOM from 'react-dom/client';
import ConnectedApp from './App.jsx';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/authReducer';

const store = configureStore({
  reducer: authReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    </Router>
  </React.StrictMode>
)
