import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  isUserAcknowledgedMode: false,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setIsUserAcknowledgedMode(state) {
      state.isUserAcknowledgedMode = true; 
    },
  },
});

export const { setMode, setIsUserAcknowledgedMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
