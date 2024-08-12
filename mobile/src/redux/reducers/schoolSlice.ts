
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSchool: null,
  schoolData: null,
  preLoginModulesList: [
    "About", "Courses", "Contact-Us", ""
  ],
  preLoginModule:'',
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setSelectedSchool(state, action) {
      state.selectedSchool = action.payload;
    },
    setSchoolData(state, action) {
      state.schoolData = action.payload;
    },
    setPreLoginPublicView(state, action){
      state.preLoginModule = action.payload
    },
  },
});

export const { setSelectedSchool, setSchoolData , setPreLoginPublicView } = schoolSlice.actions;
export default schoolSlice.reducer;


