import { Document } from 'mongoose';

export enum ROLE {
  PRODUCER = 'producer',
  CONSUMER = 'consumer',
  ADMIN = 'admin',
}

export interface IAddress {
  street: string;
  city: string;
  zip: number;
}

export interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
  role: ROLE;
  phone: string;
  address: IAddress;
}
