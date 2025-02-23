export const AppRoutes = Object.freeze({
  home: '/',

  employees: {
    path: '/employees/',

    list: {
      path: '/',
    },
    info: {
      path: ':id',
      link: (id: string) => `/employees/${id}`
    },
    add: {
      path: 'create',
    },
    edit: {
      path: ':id/edit',
      link: (id: string) => `employees/${id}/edit`
    }
  },

  status: {
    path: 'status',
  },

  login: {
    path: 'login',
  },

  register: {
    path: 'register'
  }
} as const);