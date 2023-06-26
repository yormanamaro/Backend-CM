import { Request, Response } from 'express';
import { configenv } from '@configs/configEnvs';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@decorator/joi-validation';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/auth.service';
import { BadRequesError } from '@helpers/errors/badRequesError';
import { loginSchema } from '@auth/schemas/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';


export class SignIn {

  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password, } = req.body;
    const existingUserPatient: IAuthDocument = await authService.getAuthUserByUsername(username);
    if (!existingUserPatient) {
      throw new BadRequesError('Invalid patient');
    }

    const passwordMatch: boolean = await existingUserPatient.comparePassword(password);
    if (!passwordMatch) {
      throw new BadRequesError('Invalid password');
    }

    const userJwt: string = JWT.sign(
      {
        userId: existingUserPatient._id,
        email: existingUserPatient.email,
        username: existingUserPatient.username,
        avatarColor: existingUserPatient.avatarColor
      },
      configenv.JWT_TOKEN!
    );
    req.session = { jwt: userJwt };
    res.status(HTTP_STATUS.OK).json({ message: 'User login succesfully', user: existingUserPatient, token: userJwt});
  }
}