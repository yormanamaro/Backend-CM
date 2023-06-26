import { IError } from './error.interface';

// PATTERN DESING: SINGLETON (Ya que nunca va a cambiar su comportamiento inicial)
// PATTERN DESING: FACADE (Ya que puede implementar todas las pripiedades en el hijo)
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
