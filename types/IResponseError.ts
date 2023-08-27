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

export { CustomErrorCodes };
export type { IError, IResponseError };
