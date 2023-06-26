import { Response } from 'express';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { IAuthDocument } from '@auth/interfaces/auth.interface';


// PATTER DESING: GIVEN - WHEN - THEN (dejar especificaciones, resolver procesos y contextos de asercion)

// GIVEN STEP

// MOCK 1: REQUEST
export const authMockRequest = (sessionData: IJWT, body: IAuthMock, currentUser?: AuthPayload | null, params?: unknown ) => ({
  session: sessionData,
  body,
  currentUser,
  params,
});

// MOCK 2: RESPONSE
export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// INTERFACES
export interface IJWT {
  jwt?: string;
}

export interface IAuthMock { 
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  avatarColor?: string;

}

// MOCK VALUES
export const authUserPayload: AuthPayload = { 
  userId: '60263f14648fed5246e322d3',
  username: 'Dubraska',
  email: 'dubraska@gmail.com',
  avatarColor: '#ffffff',
  iat: 12345
};

export const authMock = { 
  id: '60263f14648fed5246e322d3',
  username: 'Dubraska',
  email: 'dubraska@gmail.com',
  avatarColor: '#ffffff',
  save: () => {}
} as unknown as IAuthDocument;

export const signUpMockData = {
  _id: '60263f14648fed5246e322d3',
  username: 'Dubraska',
  email: 'dubraska@gmail.com',
  avatarColor: '#ffffff',
  password: 'dubradev',
  postCount: 0,
  quotes: '',
  work: [],
  school: [],
  location: '',
  notifications: { messages: true, comments: true, follows: true }
};
