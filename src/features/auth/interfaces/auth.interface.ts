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

export interface AuthPayload {
  userId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number;
}

export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  username: string;
  email: string;
  password: string;
  avatarColor: string;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  hashPassword: (password: string) => Promise<string>;
}

export interface ISignUpData { 
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
}

export interface IAuthJob {
  value?: string | IPatientDocument | IAuthDocument;
}