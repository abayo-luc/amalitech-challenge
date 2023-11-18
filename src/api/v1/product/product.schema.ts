import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export const productSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
