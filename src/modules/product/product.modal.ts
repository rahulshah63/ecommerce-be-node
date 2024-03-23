import { AVAILABILITY, IProductDocument } from './product.interface';
import { model, Schema } from 'mongoose';

export const ProductSchema: Schema<IProductDocument> = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  slug: { type: String, required: true, unique: true, trim: true },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  stock: { type: String, enum: Object.values(AVAILABILITY), default: AVAILABILITY.IN_STOCK },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
});

const ProductModel = model<IProductDocument>('products', ProductSchema);

export default ProductModel;
