export const AppRoutes = Object.freeze({
  home: {
    path: 'employees'
  },

  employees: {
    path: 'employees',

    list: {
      path: '/',
    },
    view: {
      path: ':id',
      link: (id: string) => `/employees/${id}`,

      edit: {
        path: 'edit',
        link: (id: string) => `/employees/${id}/edit`
      }
    },
    add: {
      path: 'create',
    },

  },

  login: {
    path: 'login',
  },

  register: {
    path: 'register'
  },

  profile: {
    path: 'profile',
  }
} as const);

export const NavigationStateKeys = Object.freeze({
  employeeCreated: {
    type: 'success',
    message: 'Added a new employee'
  },
  registrationCompleted: {
    type: 'success',
    message: 'Registration Completed'
  },
} as const);