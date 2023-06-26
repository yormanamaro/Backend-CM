import { IError } from './error.interface';

// SOLID PRINCIPLE: PREINCIPIO DE RESPONSABILIDAD UNICA.
export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}