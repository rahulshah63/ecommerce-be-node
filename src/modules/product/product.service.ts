import { Types } from 'mongoose';
import slugify from 'slugify';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesMapping } from '@/config/messages-mapping';
import { BaseService } from '../base/base.service';
import ProductModel from './product.modal';
import { CreateProductDto } from './dtos/create-product.dto';
import { IProductDocument } from './product.interface';

@Injectable()
export class ProductService extends BaseService<IProductDocument> {
  static instance: null | ProductService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(
    repository = ProductModel, //   protected readonly awsService: AwsS3Service, //   protected readonly imageService: ImageService,
  ) {
    super(repository);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductService();
    }
    return this.instance;
  }

  async create(createProductDto: CreateProductDto): Promise<IProductDocument> {
    const data = {
      ...createProductDto,
      slug: slugify(createProductDto.category + Date.now(), {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      }),
    };
    return this.repository.create(data);
  }

  async updateById(id: string | Types.ObjectId, data: any) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);
    }

    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] === '') {
          delete data[key];
        } else {
          item[key] = data[key];
        }
      });

      data = item;
    }

    return await this.repository.updateOne({ _id: id }, data);
  }
}

export default ProductService.getInstance();
