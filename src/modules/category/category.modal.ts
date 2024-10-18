import { ICategoryDocument } from './category.interface';
import { model, Schema } from 'mongoose';

const CategorySchema: Schema<ICategoryDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  type: { type: String, required: true },
  subtype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CategoryModel = model<ICategoryDocument>('category', CategorySchema);

export default CategoryModel;
