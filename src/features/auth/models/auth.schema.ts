import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { model, Model, Schema } from 'mongoose';

const SALT_ROUND = 10;

// PATTER DESIGN: AAA (Para que la entidad de usuario se desacople)
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


  authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password, SALT_ROUND);
    this.password = hashedPassword;
    next();
  });

  authSchema.methods.comparepassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as IAuthDocument).password;
    return compare(password, hashedPassword);
  };

  authSchema.methods.hashPassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND);
  };

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('auth', authSchema, 'Auth');
export { AuthModel };