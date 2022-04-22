import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      name: '', id: '', isAdmin: false,
    },
    reducers: {
      signUp: () => {

      },

    },
  },
});
export const { signUp } = userSlice.actions;
export default userSlice.reducer;
