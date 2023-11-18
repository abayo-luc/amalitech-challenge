import mongoose from 'mongoose';
import { PRODUCT_MODEL_NAME } from '../product/product.model';

export interface IProductLine extends Document {
  productId: string;
  quantity: number;
}

export const productLineSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: PRODUCT_MODEL_NAME,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});
