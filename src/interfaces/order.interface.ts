import { ValueOf } from '@/utils/util';
import { IInventory } from './inventory.interface';
import { IAddress, IUser } from './user.interface';

export const STATUS = {
  DELIVERED: 'delivered',
  READY_TO_SHIP: 'ready_to_ship',
  NOT_DELIVERED: 'not_delivered',
  ON_WAY: 'on_way',
  DELIVERING_SOON: 'delivering_soon',
} as const;

export const PAYMENT_METHODS = {
  COD: 'cod',
  ESEWA: 'esewa',
  KHALTI: 'khalti',
  BANK: 'bank',
} as const;

export const PAYMENT_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
} as const;

export interface IOrders {
  trackingId: number;
  discount: number;
  charges: number;
  //   deliveryAddress: IAddress;
  deliveryDate: Date;
  orderedDate: Date;
  status: ValueOf<typeof STATUS>;
  amount: number;
  paymentStatus: ValueOf<typeof PAYMENT_STATUS>;
  paymentMethod: ValueOf<typeof PAYMENT_METHODS>;
  orderedBy: IUser;
  orderedItem: {
    item: IInventory;
    weight: number;
  }[];
  issue?: string;
}
