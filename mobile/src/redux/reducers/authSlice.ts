import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  isAuthenticated: false,
  bearerToken: null,
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    authenticateUser(state, action) {
      const { token, role, user } = action.payload;
      state.isAuthenticated = true;
      state.bearerToken = token;
      state.role = role;
      state.user = user
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.bearerToken = null;
      state.role = '';
    },
  },
});

export const { setUser, authenticateUser, logout } = authSlice.actions;
export default authSlice.reducer;

