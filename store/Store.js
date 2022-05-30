import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './Login';
import listReducer from './List';
import commonReducer from './Common';
import departmentReducer from './Department';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    list: listReducer,
    common: commonReducer,
    department: departmentReducer,
  },
});
