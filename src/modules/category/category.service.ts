import { Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesMapping } from '@/config/messages-mapping';
import { BaseService } from '../base/base.service';
import { ICategory, ICategoryDocument } from './category.interface';
import CategoryModel from './category.modal';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService extends BaseService<ICategoryDocument> {
  static instance: null | CategoryService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(
    repository = CategoryModel, //   protected readonly awsService: AwsS3Service, //   protected readonly imageService: ImageService,
  ) {
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

  async uploadImage(id: string | Types.ObjectId, file: any): Promise<ICategoryDocument> {
    const category = await this.findById(id);

    if (category.image) {
      // const image = await this.imageService.findById(category.image);
      // await this.awsService.s3DeleteItemInBucket(image.pathWithFilename);
      // await this.imageService.deleteById(image._id);
    }

    // const aws: IAwsS3Response = await this.awsService.s3PutItemInBucket(category._id, file.buffer, {
    //   path: `images/categories`,
    // });

    // const imageDoc = await this.imageService.create(aws);

    category.image = ''; //imageDoc._id;

    await category.save();

    return category;
  }
}

export default CategoryService.getInstance();
