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
    default: undefined,
  },
  stock: { type: String, enum: Object.values(AVAILABILITY), required: true },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
});

const ProductModel = model<IProductDocument>('products', ProductSchema);

export default ProductModel;
