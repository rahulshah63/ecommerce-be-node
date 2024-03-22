import { Document, Types } from 'mongoose';

export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail',
}

export interface IToken {
  token: string;
  user: any;
  expires: Date;
  type: TokenTypes;
}

export interface ITokenDocument extends IToken, Document {}
