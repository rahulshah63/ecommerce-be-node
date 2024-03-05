import { Document } from 'mongoose';

export enum TYPE {
  FRUIT = 'fruit',
  VEGETABLE = 'vegetable',
}

export enum SUBTYPE {
  FRUIT = 'fruit',
  VEGETABLE = 'vegetable',
}

export interface ICategoryDocument extends Document {
  code: number;
  name: string;
  description: string;
  image: string;
  type: TYPE;
  subtype: SUBTYPE;
  createdAt: Date;
}
