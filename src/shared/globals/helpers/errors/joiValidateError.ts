// este es para las definiciones de esquemas de datos mediante las validaciones de joi.
import HTTP_STATUS from 'http-status-codes';
import { CustonError} from './customError';


export class JoiRequestValidateError extends CustonError{

  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}