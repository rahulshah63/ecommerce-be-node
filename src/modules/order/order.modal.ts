import { IOrders, PAYMENT_METHODS, PAYMENT_STATUS, STATUS } from '@/interfaces/order.interface';
import { Document, model, Schema } from 'mongoose';
import { inventorySchema } from '../product/product.modal';

export const orderSchema: Schema<IOrders & Document> = new Schema({
  trackingId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  charges: {
    type: Number,
    default: 0,
  },
  deliveryDate: { type: Date, default: Date.now },
  orderedDate: { type: Date, default: Date.now },
  status: { type: String, enum: Object.values(STATUS), required: true },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: { type: String, enum: Object.values(PAYMENT_STATUS), required: true },
  paymentMethod: { type: String, enum: Object.values(PAYMENT_METHODS), required: true },
  orderedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  issue: {
    type: String,
    sparse: true,
  },
  //Here, the orderedItem is not referenceing rather making a copy
  //because we need the snapshot of inventory while creating order
  //It helps to track any further upcoming issue while delivery failed
  orderedItem: {
    type: [
      {
        item: inventorySchema,
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const itemModel = model<IOrders & Document>('orders', orderSchema);

export default itemModel;
