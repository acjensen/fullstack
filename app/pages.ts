export interface Page {
  route: string
  displayName: string
}

export const pages = {
  home: { route: '/', displayName: 'Home' },
  dashboard: { route: '/dashboard', displayName: 'Dashboard' },
  protected: { route: '/protected', displayName: 'Protected' },
  login: { route: '/login', displayName: 'Sign in' },
  logout: { route: '/logout', displayName: 'Sign out' },
  register: { route: '/register', displayName: 'Register' },
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
  pages.logout,
];

export const navbarPages: Page[] = [
  // pages.home,
  // pages.about
];

export const footerPages: Page[] = [];
