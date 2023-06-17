import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@decorator/joi-validation';
import { signupSchema } from '@auth/schemas/signup';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { ISignUpData } from '@auth/interfaces/auth.interface';
import { authService } from '@services/db/auth.service';
import { Generators } from '@helpers/generators/generators';
import { BadRequesError } from '@helpers/errors/badRequesError';
import HTTP_STATUS from 'http-status-codes';
import JWT from 'jsonwebtoken';
import { configenv } from '@configs/configEnvs';


export class SignUp {
  

  @joiValidation(signupSchema) // Esto es para validar los datos antes de que se envien.
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor } = req.body; // para poderme autenticar por primera vez.
    const checkIfUserExist = await authService.getUserByUsernameOrEmail(username, email); // Para chequear que el usuario existe.
    if (checkIfUserExist) {
      throw new BadRequesError('User not exists');
    }

    const authObjectId: ObjectId = new ObjectId; // identificadores
    const userObjectId: ObjectId = new ObjectId; // representacion de un usuario

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

    //uploads: esto es para cloudinary (NO SE USA)

    // Add to redis: esto es para manejar lo de las caches (NO SE USA)

    // Add to database: esto es para la base de datso

    res 
    .status(HTTP_STATUS.CREATED)
    .json({ message: 'Created', user: userObjectId, token: userJwt});

  }

  private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        email: data.email,
        username: data.username,
        avatarColor: data.avatarColor
      },
      configenv.JWT_TOKEN!
    );
  }

  private signUpData(data: ISignUpData): IAuthDocument{
    const { _id, username, email, password, avatarColor } = data;
    return { 
      _id,
      username: Generators.firstLetterUpperCase(username),
      email: Generators.lowercase(email),
      password, 
      avatarColor,
      createdAt: new Date()
    } as IAuthDocument;
  }

  /* esta abstraccion es solo para redis con manejo de cache (no se usa en el proyecto)
  private userData(data: IAuthDocument, userObjectId: ObjectId): IPatientDocument {
    const { _id, username, email, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      username: Generators.firstLetterUpperCase(username),
      email,
      password,
      avatarColor,
      work: '',
      location: '',
      school: '',
      quote: '',
      postCount: 0,
      notification: {
        message: true,
        reactions: true,
        comments: true
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    } as unknown as IPatientDocument;
  }*/
}