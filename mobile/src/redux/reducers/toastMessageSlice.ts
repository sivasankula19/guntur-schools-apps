import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    successToastMsg: '',
    failedToastMsg: '',
    warnToastMsg: '',
    infoToastMsg: ''
};

const toastMessageSlice = createSlice({
    name: 'toastMessage',
    initialState,
    reducers: {
        setSuccessToast(state, action) {
            state.successToastMsg = action.payload;
        },
        setFailureToast(state, action) {
            state.failedToastMsg = action.payload;
        },
        setWarnToast(state, action) {
            state.warnToastMsg = action.payload;
        },
        setInfoToast(state, action) {
            state.infoToastMsg = action.payload;
        },
    },
});

export const { setSuccessToast, setFailureToast, setWarnToast, setInfoToast } = toastMessageSlice.actions;
export default toastMessageSlice.reducer;

