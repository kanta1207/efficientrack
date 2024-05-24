import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';

import db from './db/drizzle';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [],
});
