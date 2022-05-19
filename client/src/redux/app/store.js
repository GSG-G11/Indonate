import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/user/userSlice';
import errorReducer from '../feature/error/errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    devTools: true,
  },
});

export default store;
