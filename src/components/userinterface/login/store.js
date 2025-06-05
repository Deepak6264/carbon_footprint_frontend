import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Import your auth slice

export const store = configureStore({
  reducer: {
    auth: authReducer,  // Register the auth reducer
  },
});
