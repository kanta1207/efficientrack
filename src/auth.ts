import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/GitHub';

import { db } from '@/db';

export const authConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
