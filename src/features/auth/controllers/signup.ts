import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@decorator/joi-validation';
import { signupSchema } from '@auth/schemas/signup';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { authService } from '@services/db/auth.service';
import { Generators } from '@helpers/generators/generators';
import { BadRequesError } from '@helpers/errors/badRequesError';
import HTTP_STATUS from 'http-status-codes';
import { SignUpUtility } from './utilities/signup.utility';


export class SignUp extends SignUpUtility {
  
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor } = req.body; 
    const checkIfUserExist = await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      throw new BadRequesError('User not exists');
    }

    const authObjectId: ObjectId = new ObjectId;
    const userObjectId: ObjectId = new ObjectId;

    const passwordHash = await Generators.hash(password);
    const authData: IAuthDocument = SignUp.prototype.signUpData({
      _id: authObjectId,
      username,
      email,
      password: passwordHash,
      avatarColor
    });

    const userJwt: string = SignUp.prototype.signToken(authData, userObjectId);
    req.session = { jwt: userJwt}; 

    res 
    .status(HTTP_STATUS.CREATED)
    .json({ message: 'Created', user: userObjectId, token: userJwt});

  }
}