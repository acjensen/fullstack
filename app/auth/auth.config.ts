import { NextAuthConfig } from "next-auth";
import { protectedPages as protectedPages, pages } from "../pages";

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
      const isProtected = protectedPages.some((page) => {
        return nextUrl.pathname.startsWith(page.route);
      });

      if (isProtected) {
        return isLoggedIn;
      } else {
        if (isLoggedIn) {
          Response.redirect(nextUrl);
        }
      }

      // not logged in and not protected
      return true;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
