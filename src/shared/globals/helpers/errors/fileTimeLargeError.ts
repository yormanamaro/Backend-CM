import HTTP_STATUS from 'http-status-codes';
import { CustonError} from './customError';

export class FileTimeLargeError extends CustonError{

  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}