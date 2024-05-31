import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { ICategory, ICategoryDocument } from './category.interface';
import CategoryModel from './category.modal';

@Injectable()
export class CategoryService extends BaseService<ICategoryDocument> {
  static instance: null | CategoryService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(repository = CategoryModel) {
    super(repository);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CategoryService();
    }
    return this.instance;
  }

  async create(createCategoryDto: ICategory): Promise<ICategoryDocument> {
    const result = await this.repository.create(createCategoryDto);

    return result;
  }
}

export default CategoryService.getInstance();
