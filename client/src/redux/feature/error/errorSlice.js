import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'isError',
  initialState: {
    value: false,
  },
  reducers: {
    setIsError: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsError } = errorSlice.actions;
export default errorSlice.reducer;
