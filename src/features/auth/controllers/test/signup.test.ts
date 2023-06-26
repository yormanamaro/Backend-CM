import { authMockRequest, authMockResponse } from '@root/shared/globals/mocks/auth.mock';
import { Request, Response } from 'express';
import { SignUp } from '../signup';
import { CustonError } from '@helpers/errors/customError';

jest.useFakeTimers();
jest.mock('');

describe('Signup', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  // Unitary test 1
  // PATTER DESING: GIVEN - WHEN - THEN (dejar especificaciones, resolver procesos y contextos de asercion)

  it('should trow an error if username is not available', () => {

    // GIVEN STEP
    const req: Request = authMockRequest(
      {},
      {
        username: '',
        email: 'dubraska@gmail.com',
        password: 'dubradev',
        avatarColor: 'red'
      }
    ) as Request;
    const res: Response = authMockResponse();

      //WHEN STEP
    SignUp.prototype.create(req, res).catch((error: CustonError) => {

      // THEN STEP: SSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('ALERT  cannot be empty');
    });
  });


});