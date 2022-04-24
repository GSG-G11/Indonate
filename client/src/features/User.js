import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: {},
  loading: false,
};
// '/api/login'
export const getUserData = createAsyncThunk('user/getUserData', () => axios.post('/api/login', {
  email: 'admin@gamil.com',
  password: '123456789',
}));

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.value;
