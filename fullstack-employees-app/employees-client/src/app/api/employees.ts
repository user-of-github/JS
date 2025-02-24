import { AppApi } from './index';
import { Employee } from '../types';

export const EmployeesApi = AppApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllEmployees: builder.query<{ employees: Employee[] }, void>({
        query: () => ({
          url: '/employees',
          method: 'GET'
        })
      }),

      getEmployee: builder.query<Employee, string>({
        query: (id: string) => ({
          url: `/employees${id}`,
          method: 'GET'
        })
      }),

      editEmployee: builder.mutation<Employee, Employee>({
        query: (data: Employee) => ({
          url: `/employees${data.id}`,
          method: 'PUT',
          body: data
        })
      }),

      addEmployee: builder.mutation<Employee, Omit<Employee, 'id' | 'userId'>>({
        query: data => ({
          url: '/employees',
          method: 'POST',
          body: data
        })
      }),

      deleteEmployee: builder.mutation<{}, string>({
        query: id => ({
          url: `/employees/${id}`,
          method: 'DELETE',
        })
      }),
    };
  }
});

export const {
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useEditEmployeeMutation,
  useGetEmployeeQuery
} = EmployeesApi;
