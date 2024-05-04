
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSchool: null,
  schoolData: null, 
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
  },
});

export const { setSelectedSchool, setSchoolData } = schoolSlice.actions;
export default schoolSlice.reducer;


