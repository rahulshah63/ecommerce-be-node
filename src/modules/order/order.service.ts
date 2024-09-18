import { Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesMapping } from '@/config/messages-mapping';
import { BaseService } from '../base/base.service';
import OrderModel from './order.modal';
import { CreateOrderDto } from './dtos/create-order.dto';
import { IOrderDocument } from './order.interface';
import ProductService from '../product/product.service';
import httpStatus from 'http-status';
import { AVAILABILITY, IProductDocument } from '../product/product.interface';
import { IUserDocument, ROLE } from '../user/user.interface';

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

  async addOrder(createOrderDTO: CreateOrderDto, user: IUserDocument): Promise<IOrderDocument> {
    const { items } = createOrderDTO;

    const itemList = items.map(async ({ productId, quantity }) => {
      const product: IProductDocument = await ProductService.findById(productId);
      if (!product) throw new HttpException('Product not found', httpStatus.NOT_FOUND);
      if (product.stock === AVAILABILITY.OUT_STOCK || product.quantity === 0) throw new HttpException('Currently out of stock', httpStatus.NOT_FOUND);
      if (product.quantity < quantity) throw new HttpException('Ordered quantity exceed the stock, cannot fulfill order', httpStatus.NOT_FOUND);
      const { price } = product;
      return { product: product._id, quantity, price, total: price * quantity };
    });

    const orderedItems = await Promise.all(itemList);

    const order = await this.repository.create({
      items: orderedItems,
      orderedBy: user._id,
      trackingId: Date.now(),
    });

    for (const item of orderedItems) {
      const { product: productId, quantity } = item;
      const product = await ProductService.repository.findOneAndUpdate({ _id: productId }, { $inc: { quantity: -quantity, sold: quantity } });
      if (product.quantity === 0) await ProductService.updateOne({ _id: productId }, { stock: AVAILABILITY.OUT_STOCK });
    }

    // await this.cartService.deleteCart(userID);

    return order;
  }

  public async changeOrderStatus(id: Types.ObjectId | string, status: string) {
    if (!['Not Processed', 'Processing', 'Shipped', 'Delivered'].includes(status)) {
      throw new HttpException(MessagesMapping['#26'], HttpStatus.BAD_REQUEST);
    }

    const order = await this.findById(id);

    // if (status === 'Cancelled') {
    //   for (const item of order.items) {
    //     const product = await ProductService.findById(item.product);

    //     await this.productService.updateById(item.product, {
    //       quantity: product.quantity + item.totalProductQuantity,
    //       sold: product.sold - item.totalProductQuantity,
    //     });
    //   }

    //   await this.deleteById(id);

    //   return {
    //     type: 'Success',
    //     message: 'successfulOrderCancel',
    //     statusCode: 200,
    //   };
    // }

    order.status = status;

    await order.save();

    return {
      type: 'Success',
      message: 'successfulStatusUpdate',
      statusCode: 200,
    };
  }

  async getOrder(trackingId: string, user: IUserDocument) {
    const order = await this.findOne({ trackingId });
    if (!order) throw new HttpException(MessagesMapping['#14'], HttpStatus.NOT_FOUND);

    if (user.role === ROLE.ADMIN || user.role === ROLE.PRODUCER) {
      return {
        type: 'Success',
        message: 'successfulOrdersFound',
        statusCode: 200,
        order,
      };
    }
    if (String(order.orderedBy) !== String(user._id)) throw new HttpException(MessagesMapping['#24'], httpStatus.FORBIDDEN);
    return {
      type: 'Success',
      message: 'successfulOrderFound',
      statusCode: 200,
      order,
    };
  }
}

export default OrderService.getInstance();
