import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isProtected = nextUrl.pathname.startsWith("/protected");

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
