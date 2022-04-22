import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../feature/userReducer';

const store = configureStore({
  reducer: {
    user: useReducer,
  },
});

export default store;
