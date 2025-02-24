import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../types';
import { EmployeesApi } from '../../api/employees';
import { RootState } from '../index';

interface EmployeesSliceState {
  employees: Employee[] | null;
}

const initialState: EmployeesSliceState = {
  employees: null
} as const;

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(EmployeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
        state.employees = action.payload.employees;
      });
  }
});

export default employeesSlice.reducer;

export const selectEmployee = (state: RootState) => state.employeeReducer.employees;