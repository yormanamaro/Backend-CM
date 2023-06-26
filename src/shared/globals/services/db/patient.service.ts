import { IPatientDocument } from '@patient/interfaces/patientDocument.interface';
import { UserModel } from '@patient/models/patient.schema';
import mongoose from 'mongoose';


// SOLID PRINCIPLE: OPEN/CLOSE, SINGLE RESPONSABILITY (Permite hacer extenson de la clase en cuanto a sus funcionalidades y cerrada en cuanto a lo que ya se habia definido previamente)
class UserService {

  public async addUserData(data: IPatientDocument): Promise<void> {
    await UserModel.create(data);
  }

  public async getUserById(userId: string): Promise<IPatientDocument> {
    const users: IPatientDocument[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() },
    ]);
    return users[0];
  }  

  private aggregateProject() {
    return {
      _id: 1,
      username:'$authId.username',
      email: '$authId.email',
      avatarColor: '$authId.avatarColor',
      createAt: '$authId.createAt',
      postCount: '$authId.postCount',
      work: 1,
      school: 1,
      quote: 1,
      postDiagnosis: 1,
      location: 1,
      notification: 1,
      social: 1,
      medicalSpecialty: 1,
      appointmentDate: 1
    };
  }
}

export const userService: UserService = new UserService();