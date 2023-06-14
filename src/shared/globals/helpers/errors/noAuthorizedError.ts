import HTTP_STATUS from 'http-status-codes';
import { CustonError } from './customError';

export class NotAuthorizedError extends CustonError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
