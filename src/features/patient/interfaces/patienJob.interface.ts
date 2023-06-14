import { INotificationSettings } from './notificationSettings.interface';
import { IPatientDocument } from './patientDocument.interface';


export interface IUserJob {
  keyOne?: string;
  keyTwo?: string;
  key?: string;
  value?: string | INotificationSettings | IPatientDocument;
}