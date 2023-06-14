import { ObjectId } from 'mongodb';
import { INotificationSettings } from './notificationSettings.interface';
import { ISocialLinks } from './socialLinks.interface';
import { IMedicalSpecialty } from './medicalSpecialty.interface';


export interface IPatient { // IUser
  _id: string | ObjectId;
  authId: string | ObjectId;
  username: string;
  email: string;
  password?: string;
  avatarColor: string;
  postsCount?: number; // cuantas vaces ha descritos diagnosticos.
  work: string;
  school: string;
  quote: string; // cita personal.
  location: string;
  notification: INotificationSettings;
  social: ISocialLinks; // redes sociales
  postDiagnosis?: string;
  medicalSpecialty?: IMedicalSpecialty;
  appointmentDate?: number;
  identificationNumber: number;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt: Date;
}