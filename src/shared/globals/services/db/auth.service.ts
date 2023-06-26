import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { Generators } from '@helpers/generators/generators';

// SOLID PRINCIPLE: OPEN/CLOSE, SINGLE RESPONSABILITY (Permite hacer extenson de la clase en cuanto a sus funcionalidades y cerrada en cuanto a lo que ya se habia definido previamente)
// SOLID PRINCIPLE: SINGLE RESPONSABILITY (Ya que tiene solamente un objetivo)
class AuthService {

  public async createAuthUser(data: IAuthDocument): Promise<void> {  
    await AuthModel.create(data); 
  }

  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
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