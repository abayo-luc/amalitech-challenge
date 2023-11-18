import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { productLineSchema } from '../ProductLine/product.line.schema';
import { USER_MODEL_NAME } from '../user/user.model';

export const orderSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: USER_MODEL_NAME,
    },
    products: [productLineSchema],
  },
  {
    timestamps: true,
  }
);
