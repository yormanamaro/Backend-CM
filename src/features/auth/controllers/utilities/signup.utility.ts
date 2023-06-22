import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { ObjectId } from 'mongodb';
import { configenv } from '@configs/configEnvs';
import { Generators } from '@helpers/generators/generators';
import { ISignUpData } from '@auth/interfaces/auth.interface';



export abstract class SignUpUtility {

  protected signToken(data: IAuthDocument, userObjectId: ObjectId): string {
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

  protected signUpData(data: ISignUpData): IAuthDocument{
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

}