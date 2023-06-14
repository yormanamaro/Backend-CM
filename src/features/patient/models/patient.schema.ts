import { IPatientDocument } from '@patient/interfaces/patientDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

// Principio AAA (Auth, Authorization, Auditory) PRINCIPIO SOLID.
const userSchema: Schema = new Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }, // ese Auth se va a usar en auth de features.
  postsCount: { type: Number, default: 0 },
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: { type: Number },
  notification: {
    messages: { type: Boolean, default: true },
    reactions: { type: Boolean, default: true },
    comments: { type: Boolean, default: true },
  },
  social: {
    facebook: { type: String, default: '' },
    instratio: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  work: { type: String, default: '' },
  school: { type: String, default: '' },
  location: { type: String, default: '' },
  quote: { type: String, default: '' },
  postDiagnosis: { type: String, default: '' },
  medicalSpecialty: {
    name: { type: String, default: '' },
    specialty: { type: String, default: '' },
  },
  appointmentDate: { type: Number, default: 0 },
  identificationNumber: { type: Number, default: 0 },
});

const UserModel: Model<IPatientDocument> = model<IPatientDocument>('User', userSchema, 'UserRef');
export { UserModel};