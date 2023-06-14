import { IPatientDocument } from './patientDocument.interface';

export interface IAllUsers {
  users: IPatientDocument[];
  totalUsers: number;
}