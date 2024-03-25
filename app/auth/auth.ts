import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { getUser, mockDb } from "../server/db";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // TODO: implement unauth session persistence
      // https://github.com/lightenna/nextjs-app-auth-anon-logins-example/blob/main/src/app/api/auth/%5B...nextauth%5D/route.ts
      async authorize({ email, password }: any) {
        let user = await getUser(email);
        if (user.length === 0) return null;
        const passwordsMatch = mockDb
          ? password === user[0].password!
          : await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as any;
        // return null;
      },
    }),
  ],
});
