import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IMedicalSpecialty } from './////////////'


export interface IPatientDocument extends Document { // IUserDocument.
  _id: string | ObjectId;
  authId: string | ObjectId;
  username?: string;
  email?: string;
  password?: string;
  location?: string;
  medicalSpecialty?: IMedicalSpecialty;
  appointmentDate?: number;
  identificationNumber: number;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt?: Date;
}