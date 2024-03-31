import { type NextAuthConfig } from 'next-auth';
import { pages, protectedPages } from '../pages';

export const authConfig = {
  pages: {
    signIn: pages.signin.route,
    signOut: pages.signout.route,
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
      }
      return true;
    },
  },
  trustHost: true,
  basePath: undefined, // set via NEXTAUTH_URL instead
} satisfies NextAuthConfig;
