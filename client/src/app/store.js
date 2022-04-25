import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User';

const store = configureStore({
  reducer: { userReducer },
});

export default store;
