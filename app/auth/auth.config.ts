import { type NextAuthConfig } from 'next-auth';
import { pages, protectedPages } from '../pages';

export const authConfig = {
  pages: {
    signIn: pages.login.route,
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = protectedPages.some((page) => nextUrl.pathname.startsWith(page.route));

      if (isProtected) {
        return isLoggedIn;
      } if (isLoggedIn) {
        Response.redirect(nextUrl);
      }

      // not logged in and not protected
      return true;
    },
  },
  trustHost: true,
  basePath: undefined, // set via NEXTAUTH_URL instead
} satisfies NextAuthConfig;
