import mongoose from 'mongoose';
import { productSchema } from './product.schema';

export interface IProduct extends Document {
  _id: string;
  name: string;
  stock: number;
  price: number;
}

export const PRODUCT_MODEL_NAME = 'product';

export const Product = mongoose.model<IProduct>(
  PRODUCT_MODEL_NAME,
  productSchema
);

export default Product;
