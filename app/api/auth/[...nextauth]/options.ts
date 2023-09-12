import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        const user = await prisma.account.findUnique({
          where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    session: async ({ token, session }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/account/login',
  },
};

export default options;
