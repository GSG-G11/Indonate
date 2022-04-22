import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../feature/useReducer';

const store = configureStore({
  reducer: {
    user: useReducer,
  },
});

export default store;
