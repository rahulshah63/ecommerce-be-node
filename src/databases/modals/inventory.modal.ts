import { AVAILABILITY, IInventory } from '@/interfaces/inventory.interface';
import { Document, model, Schema } from 'mongoose';

export const inventorySchema: Schema<IInventory & Document> = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'items',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    default: undefined,
  },
  stock: { type: String, enum: Object.values(AVAILABILITY), required: true },
  addedBy: {
    type: String,
    ref: 'user',
    required: true,
    index: true,
  },
});

const itemModel = model<IInventory & Document>('items', inventorySchema);

export default itemModel;
