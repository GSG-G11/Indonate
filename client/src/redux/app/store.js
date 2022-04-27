import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    devTools: true,
  },
});

export default store;
