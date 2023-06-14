import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { Generators } from '@helpers/generators/generators';

class AuthService {

  public async createAuthUser(data: IAuthDocument): Promise<void> { // Esquema de authuser. 
    await AuthModel.create(data); // para guardar la data en mongo.
  }

  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> { // para casos en el controlador que se necesite identificar al usuario primero.
    const query = {
      $or: [{ username: Generators.firstLetterUpperCase(username)}, {email: Generators.lowercase(email) }]
    };
    const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
    
    return user;
  };

  public async getAuthUserByUsername(username: string): Promise<IAuthDocument>{
    const user: IAuthDocument = (await AuthModel.findOne({username: Generators.firstLetterUpperCase(username) }).exec()) as IAuthDocument;
    return user;
  }
  
}

export const authService: AuthService = new AuthService();