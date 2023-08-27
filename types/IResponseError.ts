import { ZodIssueCode } from 'zod';

enum CustomErrorCodes {
  UNIQUE_CONSTRAINT_ERROR = 'UNIQUE_CONSTRAINT_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

interface IError {
  code: ZodIssueCode | CustomErrorCodes;
  message: string;
  path: (string | number)[];
}

interface IResponseError {
  errors: IError[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isIResponseError = (obj: any): obj is IResponseError => {
  if (typeof obj === 'object' && 'errors' in obj) {
    if (Array.isArray(obj.errors)) {
      return obj.errors.every(
        (error: IError) =>
          typeof error.code === 'string' &&
          typeof error.message === 'string' &&
          (!error.path ||
            (Array.isArray(error.path) &&
              error.path.every((path) => typeof path === 'string')))
      );
    }
  }

  return false;
};

export { CustomErrorCodes, isIResponseError };
export type { IError, IResponseError };
