import { ICategoryDocument, SUBTYPE, TYPE } from './category.interface';
import { model, Schema } from 'mongoose';

const CategorySchema: Schema<ICategoryDocument> = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
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
    required: true,
  },
  type: { type: String, enum: Object.values(TYPE), required: true },
  subtype: { type: String, enum: Object.values(SUBTYPE), required: true },
  createdAt: { type: Date, default: Date.now },
});

const CategoryModel = model<ICategoryDocument>('category', CategorySchema);

export default CategoryModel;
