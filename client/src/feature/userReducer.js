import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      name: '', id: '', isAdmin: false,
    },
  },
  reducers: {
    signUp: (state, action) => {
      state.userInfo = action.payload;
    },
  },

});

export const { signUp } = userSlice.actions;
export default userSlice.reducer;
