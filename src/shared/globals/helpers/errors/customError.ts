import { IError } from './error.interface';

export abstract class CustonError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message
    };
  }
}
