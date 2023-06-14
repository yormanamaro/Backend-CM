import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { model, Model, Schema } from 'mongoose';

const SALT_ROUND = 10;
//Patron de diseno AAA
const authSchema: Schema = new Schema(
  {
    username: { type: 'String' },
    email: { type: 'String' },
    password: { type: 'String' },
    avatarColor: { type: 'String' },
    createdAt: { type: 'Date', default: Date.now() },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

  // Virtual Metodos// procedimientos de logica acosiados al schema.

  //para conceptos propios de las consultas.
  authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password, SALT_ROUND);
    this.password = hashedPassword;
    next();
  });

  // para comprar password (este seria parte de mis metodos propios).
  authSchema.methods.comparepassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as IAuthDocument).password; // ojo que puede ir con !.
    return compare(password, hashedPassword);
  };

  // para hash que retorna el valor.
  authSchema.methods.hashPassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND);
  };

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('auth', authSchema, 'Auth');
export { AuthModel };