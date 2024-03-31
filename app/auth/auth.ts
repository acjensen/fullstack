import { compare } from 'bcrypt-ts';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser, useMockDb } from '../server/db';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
}: {
  handlers: { GET: any, POST: any },
  auth: any,
  signIn: any,
  signOut: any,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // TODO: implement unauth session persistence
      // https://github.com/lightenna/nextjs-app-auth-anon-logins-example/blob/main/src/app/api/auth/%5B...nextauth%5D/route.ts
      async authorize({ email, password }: any) {
        const user = await getUser(email);
        if (user.length === 0) return null;
        const passwordsMatch = useMockDb
          ? password === user[0].password!
          : await compare(password, user[0].password);
        if (passwordsMatch) return user[0] as any;
        return null;
      },
    }),
  ],
});
