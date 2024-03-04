/* eslint-disable prettier/prettier */
import { Types } from 'mongoose';

export interface IBaseService<T> {
  create(doc: Partial<T>): Promise<T>;
  findById(id: string | Types.ObjectId): Promise<T>;
  findOne(filter: object): Promise<T>;
  find(filter: object): Promise<T[]>;
  updateById(id: string | Types.ObjectId, update: object): Promise<T>;
  updateOne(filter: object, update: object): Promise<T>;
  updateMany(filter: object, update: object): Promise<T>;
  deleteById(id: string | Types.ObjectId): Promise<T>;
  deleteOne(filter: object): Promise<T>;
  deleteMany(filter: object): Promise<T>;
}
