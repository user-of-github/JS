export const Routes = Object.freeze({
  root: '/',
  configurator: '/configurator',
  configuration: '/configurator/:configurationId',
  about: '/about'
} as const);

export const toConfigurationLink = (id: string): string => `/configurator/${id}`;
