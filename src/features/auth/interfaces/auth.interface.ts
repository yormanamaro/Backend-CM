// interface de autenticacion.
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IPatientDocument } from '@patient/interfaces/patientDocument.interface';

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export interface AuthPayload { // estructura de respuesta con autenticacion.
  userId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number; // tiempo de expiracion token.
}

export interface IAuthDocument extends Document { // molde que se va a completar con el documento del scherma.
  _id: string | ObjectId;
  username: string;
  email: string;
  password: string;
  avatarColor: string;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  hashPassword: (password: string) => Promise<string>; // firma para comprar
}

export interface ISignUpData { // para el registro de usuario
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
}

export interface IAuthJob { // para disponibilizar el tema de los workers ojo que no va.
  value?: string | IPatientDocument | IAuthDocument;
}