import { Document } from 'mongoose';

export enum ROLE {
  PRODUCER = 'producer',
  CONSUMER = 'consumer',
  ADMIN = 'admin',
}

export enum LoginMethod {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export interface IAddress {
  street: string;
  city: string;
  zip: number;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  role: ROLE;
  phone: string;
  address: IAddress;
  loginMethod: LoginMethod;
}

export interface IUserDocument extends IUser, Document {}
