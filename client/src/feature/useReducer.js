import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      username: '', email: '', phone: '', password: '',
    },
    reducers: {
      signUp: () => {

      },
    },
  },
});
export const { signUp } = userSlice.actions;
export default userSlice.reducer;
