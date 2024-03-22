import { ICategoryDocument } from '@/modules/category/category.interface';
import { Document, Types } from 'mongoose';

export enum AVAILABILITY {
  IN_STOCK = 'in_stock',
  OUT_STOCK = 'out_stock',
  // UNAVAILABLE = 'unavailable',
  // AVAILABLE = 'available',
  // SOON_AVAILABLE = 'soon_available',
}

export interface IProduct {
  category: ICategoryDocument;
  code: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  stock: AVAILABILITY;
  seller: Types.ObjectId;
}

export interface IProductDocument extends IProduct, Document {}
