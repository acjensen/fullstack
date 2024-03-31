export interface Page {
  route: string
  displayName: string
}

export const pages = {
  home: { route: '/', displayName: 'Home' },
  dashboard: { route: '/dashboard', displayName: 'Dashboard' },
  protected: { route: '/protected', displayName: 'Protected' },
  signin: { route: '/auth/signin', displayName: 'Sign in' },
  signout: { route: '/auth/signout', displayName: 'Sign out' },
  register: { route: '/auth/register', displayName: 'Register' },
  clientVsServer: {
    route: '/examples/client-vs-server',
    displayName: 'Client vs Server',
  },
  privacy: { route: '/privacy', displayName: 'Privacy' },
  settings: { route: '/settings', displayName: 'Settings' },
  about: { route: '/about', displayName: 'About' },
  ping: { route: '/ping', displayName: 'Ping' },
};

export const protectedPages: Page[] = [
  pages.dashboard,
  pages.protected,
  pages.settings,
];

export const userPages: Page[] = [
  pages.dashboard,
  pages.settings,
  pages.signout,
];

export const navbarPages: Page[] = [
  // pages.home,
  // pages.about
];

export const footerPages: Page[] = [];
