import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const client =
  globalThis.prisma ||
  new PrismaClient().$extends({
    query: {
      account: {
        async create({ args, query }) {
          args.data.password = await bcrypt.hash(
            args.data.password,
            saltRounds
          );
          return query(args);
        },

        async update({ args, query }) {
          if (typeof args.data.password === 'string') {
            args.data.password = await bcrypt.hash(
              args.data.password,
              saltRounds
            );
          }

          return query(args);
        },
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
