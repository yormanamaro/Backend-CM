// Error que se ve cuando no se encuentra la ruta.

import HTTP_STATUS from 'http-status-codes';
import { CustonError } from './customError';

export class NotFoundError extends CustonError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
