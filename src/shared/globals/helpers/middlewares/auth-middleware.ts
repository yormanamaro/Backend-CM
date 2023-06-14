import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { configenv } from '@configs/configEnvs';
import { NotAuthorizedError } from '@helpers/errors/noAuthorizedError';
import { AuthPayload } from '@auth/interfaces/auth.interface';



export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available. Please login again.');
    }

    try {
      const payload: AuthPayload = JWT.verify(req.session?.jwt, configenv.JWT_TOKEN!) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Login again.');
    }
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();