import { Types } from 'mongoose';
import slugify from 'slugify';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesMapping } from '@/config/messages-mapping';
import { BaseService } from '../base/base.service';
import OrderModel from './order.modal';
import { CreateOrderDto } from './dtos/create-order.dto';
import { IOrderDocument } from './order.interface';
import ProductService from '../product/product.service';
import httpStatus from 'http-status';
import { AVAILABILITY } from '../product/product.interface';
import { IUser, ROLE } from '../user/user.interface';

@Injectable()
export class OrderService extends BaseService<IOrderDocument> {
  static instance: null | OrderService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(
    repository = OrderModel, //   protected readonly awsService: AwsS3Service, //   protected readonly imageService: ImageService,
  ) {
    super(repository);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new OrderService();
    }
    return this.instance;
  }

  async addOrder(createOrderDTO: CreateOrderDto, userId: string): Promise<IOrderDocument> {
    const { items } = createOrderDTO;
    // const cart = await this.cartService.findOne({ user: userId });

    // if (cart.items.length === 0) {
    //   throw new HttpException(MessagesMapping['#16'], HttpStatus.NOT_FOUND);
    // }

    const orderedItems = items.map(async ({ productCode, quantity }) => {
      const product = await ProductService.findOne({ code: productCode });
      if (!product) throw new HttpException('Product not found', httpStatus.NOT_FOUND);
      if (product.stock === AVAILABILITY.OUT_STOCK) throw new HttpException('Currently out of stock', httpStatus.NOT_FOUND);
      const { price } = product;
      return { product: product._id, quantity, price, total: price * quantity };
    });

    Promise.all(orderedItems);

    const order = await this.repository.create({
      items: orderedItems,
      orderedBy: userId,
      trackingId: `trackId-${Date.now()}`,
    });

    for (const item of orderedItems) {
      const { product, total } = await item;

      // await this.productService.updateById(id, { sold, quantity });
    }

    // await this.cartService.deleteCart(userID);

    return order;
  }

  async getOrder(user: IUser, id: Types.ObjectId | string) {
    if (user.role === ROLE.ADMIN || user.role === ROLE.PRODUCER) {
      const orders = await this.findById(id);

      return {
        type: 'Success',
        message: 'successfulOrdersFound',
        statusCode: 200,
        orders,
      };
    }
    const order = await this.findById(id);

    return {
      type: 'Success',
      message: 'successfulOrderFound',
      statusCode: 200,
      order,
    };
  }
}

export default OrderService.getInstance();
