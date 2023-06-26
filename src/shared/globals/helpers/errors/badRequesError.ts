import HTTP_STATUS from 'http-status-codes';
import { CustonError} from './customError';

export class BadRequesError extends CustonError{

  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}