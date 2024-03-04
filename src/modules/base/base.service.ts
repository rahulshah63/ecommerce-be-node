import { Document, Types } from 'mongoose';

import { HttpException, HttpStatus } from '@nestjs/common';
import { MessagesMapping } from '@/config/messages-mapping';
import { IBaseService } from './base.interface';

export abstract class BaseService implements IBaseService<Document> {
  constructor(protected readonly repository) {}

  create(doc: Partial<any>): Promise<any> {
    return this.repository.create(doc);
  }

  async findById(id: string | Types.ObjectId): Promise<any> {
    const result = await this.repository.findById(id);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }
  async findOne(filter: object): Promise<any> {
    const result = await this.repository.findOne(filter);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }

  find(filter: object): Promise<any[]> {
    return this.repository.find(filter);
  }

  async updateById(id: string | Types.ObjectId, update: object): Promise<any> {
    const result = await this.repository.updateById(id, update);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateOne(filter: object, update: object): Promise<any> {
    const result = await this.repository.updateOne(filter, update);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateMany(filter: object, update: object): Promise<any> {
    const result = await this.repository.updateMany(filter, update);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async deleteById(id: string | Types.ObjectId): Promise<any> {
    const result = await this.repository.deleteById(id);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async deleteOne(filter: object): Promise<any> {
    const result = await this.repository.deleteOne(filter);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async deleteMany(filter: object): Promise<any> {
    const result = await this.repository.deleteMany(filter);

    if (!result) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
