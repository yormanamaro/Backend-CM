import HTTP_STATUS from 'http-status-codes';
import { CustonError} from './customError';

export class ServerError extends CustonError{

  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}