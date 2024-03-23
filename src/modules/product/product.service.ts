import { Types } from 'mongoose';
import slugify from 'slugify';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesMapping } from '@/config/messages-mapping';
import { BaseService } from '../base/base.service';
import ProductModel from './product.modal';
import { CreateProductDto } from './dtos/create-product.dto';
import { IProduct, IProductDocument } from './product.interface';
import { IUser, IUserDocument } from '../user/user.interface';

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

  async addProduct(createProductDto: CreateProductDto, user: IUserDocument): Promise<IProductDocument> {
    const data = {
      ...createProductDto,
      slug: slugify(createProductDto.category + Date.now(), {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      }),
      seller: user._id satisfies Types.ObjectId,
    };
    return this.repository.create(data);
  }
}

export default ProductService.getInstance();
