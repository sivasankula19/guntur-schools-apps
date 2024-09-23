import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessModules:[],
  rootAccess:false,
};

const accessControlSlice = createSlice({
  name: 'accessControl',
  initialState,
  reducers: {
    setAccessModulesList(state, action) {
      state.accessModules = action.payload;
    },
    setRootAccessValue(state, action){
        state.rootAccess = action.payload;
    },
    resetAccessState(state){
      state.accessModules = [];
      state.rootAccess = false;
    }
  },
});

export const { setAccessModulesList, setRootAccessValue ,resetAccessState} = accessControlSlice.actions;
export default accessControlSlice.reducer;

