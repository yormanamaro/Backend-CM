import HTTP_STATUS from 'http-status-codes';
import { CustonError} from './customError';

// SOLID PRINCIPLE: LISKOV SUSTITUTION (Hereda caracteristicas a las cuales hay que dar uso en 100%)
export class JoiRequestValidateError extends CustonError{

  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}