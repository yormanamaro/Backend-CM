import { IError } from './error.interface';

// Pincipio solid: Principio de responsabilidad unica.
export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}