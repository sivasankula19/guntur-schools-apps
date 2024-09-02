import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isDashboardRoute: false,
};

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setIsDashboardRoute(state, action) {
      state.isDashboardRoute = action.payload;
    },
  },
});

export const { setIsDashboardRoute } = routeSlice.actions;
export default routeSlice.reducer;

