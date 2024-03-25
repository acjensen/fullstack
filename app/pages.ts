export const pages = {
  home: "/",
  dashboard: "/dashboard",
  protected: "/protected",
  login: "/login",
  logout: "/logout",
  clientVsServer: "/examples/client-vs-server",
  privacy: "/privacy",
  settings: "/settings",
  about: "/about",
  ping: "/ping",
};

export const routes = Object.values(pages);

export const protectedRoutes = [
  pages.dashboard,
  pages.protected,
  pages.settings,
];

export const userPages = [pages.dashboard, pages.settings, pages.logout];

export const navbarPages = [pages.home, pages.about];
