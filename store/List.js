import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  filter: {
    incidentObject: '',
    status: '',
    reportType: '',
    departmentId: '',
    searchKey: '',
    isFilter: false,
  },
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilterObject: (state, action) => {
      console.log(action.payload);
      state.filter.incidentObject = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filter.status = action.payload;
    },
    setFilterReport: (state, action) => {
      state.filter.reportType = action.payload;
    },
    setFilterDepartment: (state, action) => {
      state.filter.departmentId = action.payload;
    },
    setFilter: (state, action) => {
      state.filter.isFilter = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetFilter: state => {
      state.filter = {
        incidentObject: '',
        status: '',
        reportType: '',
        departmentId: '',
        searchKey: '',
        isFilter: false,
      };
    },
  },
});

export const {
  setData,
  setFilterObject,
  setFilterStatus,
  setFilterReport,
  resetFilter,
  setFilter,
  setLoading,
  setFilterDepartment,
} = listSlice.actions;
export const selectListData = state => state.list.data;
export const selectListFilter = state => state.list.filter;
export const selectListLoading = state => state.list.loading;
export default listSlice.reducer;
