import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userData: {},
  loading: false,
  isUserAuthorized: false,
};
export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const { data: { data } } = await axios.get('/api/checkAuth');
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sign: (state, action) => {
      state.userData = action.payload;
      state.isUserAuthorized = true;
    },
    logout: (state) => {
      state.userData = {};
      state.loading = false;
      state.isUserAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.isUserAuthorized = true;
      state.userData = action.payload;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.loading = false;
      state.isUserAuthorized = false;
    });
  },

});
export const { sign, logout } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user.value;
