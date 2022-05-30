import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setData} = commonSlice.actions;
export const selectCommonData = state => state.common.data;
export default commonSlice.reducer;
