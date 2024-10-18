import { Document } from 'mongoose';

export interface ICategory {
  name: string;
  description: string;
  image: string;
  type: string;
  subtype: string;
  createdAt?: Date;
}

export interface ICategoryDocument extends ICategory, Document {}
