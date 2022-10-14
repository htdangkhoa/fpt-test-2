import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrUpdateEmployee, deleteEmployee, getEmployees } from "../../api";
import { Employee } from "../../interfaces/Employee";

type InitialState = {
  loading: boolean;
  error?: string;
  employees: Employee[];
};

const initialState: InitialState = {
  loading: false,
  error: undefined,
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee.slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get employees
      .addCase(getEmployees.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        const employees = action.payload.items as any[] as Employee[];

        state.loading = false;
        state.employees = ([] as Employee[]).concat(...employees);
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // delete employee
      .addCase(deleteEmployee.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((employee) => employee.key !== action.meta.arg);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // create or update employee
      .addCase(createOrUpdateEmployee.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrUpdateEmployee.fulfilled, (state, action) => {
        console.log("🚀 ~ file: employee.slice.ts ~ line 72 ~ .addCase ~ action", action);
        state.loading = false;
        // state.employees = state.employees.map((employee) => {
        //   if (employee.key === action.meta.arg.key) {
        //     return action.meta.arg;
        //   }
      })
      .addCase(createOrUpdateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addDefaultCase((state, action) => {
      return state;
    });
  },
});

export default employeeSlice.reducer;
