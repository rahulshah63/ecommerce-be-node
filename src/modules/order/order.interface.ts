import { Document, Types } from 'mongoose';
import { IAddress } from '../user/user.interface';

export enum STATUS {
  DELIVERED = 'delivered',
  READY_TO_SHIP = 'ready_to_ship',
  NOT_DELIVERED = 'not_delivered',
  ON_WAY = 'on_way',
  DELIVERING_SOON = 'delivering_soon',
}

export enum PAYMENT_METHODS {
  COD = 'cod',
  ESEWA = 'esewa',
  KHALTI = 'khalti',
  BANK = 'bank',
}

export enum PAYMENT_STATUS {
  PAID = 'paid',
  UNPAID = 'unpaid',
}

export interface IOrder {
  trackingId: number;
  discount: number;
  charges: number;
  // deliveryAddress: IAddress;
  orderedDate: Date;
  status: STATUS;
  // amount: number;
  paymentStatus: PAYMENT_STATUS;
  paymentMethod: PAYMENT_METHODS;
  orderedBy: Types.ObjectId; // ! Updated since no IUser was defined.
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
  }[];
}

export interface IOrderDocument extends IOrder, Document {}
