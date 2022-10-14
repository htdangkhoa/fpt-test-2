import { combineReducers } from "@reduxjs/toolkit";
import employeeSlice from "./slices/employee.slice";

const reducer = combineReducers({
  employee: employeeSlice,
});

export default reducer;
