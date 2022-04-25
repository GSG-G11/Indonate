import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userData: {},
  loading: false,
  isAuthorized: false,
};
// '/api/login'
export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const response = await axios.get('/api/checkAuth');
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthorized = true;
      state.userData = action.payload;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.loading = false;
      state.isAuthorized = false;
    });
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.value;
