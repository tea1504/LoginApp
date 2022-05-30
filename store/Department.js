import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setData} = departmentSlice.actions;
export const selectDepartmentData = state => state.department.data;
export default departmentSlice.reducer;
