import { IOrderDocument, PAYMENT_METHODS, PAYMENT_STATUS, STATUS } from './order.interface';
import { model, Schema } from 'mongoose';

export const orderSchema: Schema<IOrderDocument> = new Schema({
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
  orderedDate: { type: Date, default: Date.now },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.READY_TO_SHIP },
  paymentStatus: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.UNPAID },
  paymentMethod: { type: String, enum: Object.values(PAYMENT_METHODS), default: PAYMENT_METHODS.COD },
 orderedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  },
  items: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

const itemModel = model<IOrderDocument>('orders', orderSchema);

export default itemModel;
