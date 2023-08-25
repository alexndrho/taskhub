import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/app/libs/prismadb';
import { ZodError } from 'zod';
import {
  CustomErrorCodes,
  IError,
  IResponseError,
} from '@/types/IResponseError';

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    await prisma.account.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json({ message: 'Account created' }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: IError[] = error.issues.map((issue) => {
        const { code, message, path } = issue;
        return { code, message, path };
      });

      return NextResponse.json({ errors } as IResponseError, { status: 400 });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            errors: [
              {
                code: CustomErrorCodes.UNIQUE_CONSTRAINT_ERROR,
                message: 'Email already exists',
              },
            ],
          } as IResponseError,
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        errors: [
          {
            code: CustomErrorCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          },
        ],
      } as IResponseError,
      { status: 500 }
    );
  }
};

export { POST };
