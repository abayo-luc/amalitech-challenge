import mongoose from 'mongoose';
import { IProductLine } from '../ProductLine/product.line.schema';

import Product from '../product/product.model';
import { orderSchema } from './order.schema';

export interface IOrder extends Document {
  _id: string;
  userId: string;
  products: IProductLine[];
}

orderSchema.pre('save', async function (next) {
  try {
    for (const lineItem of this.products) {
      const product = await Product.findById(lineItem.productId);
      if (!product) throw new Error('Product not found');
      if (!product || product.stock < lineItem.quantity) {
        throw new Error(`Not enough stock for ${product.name} product`);
      }
    }

    // update stock on each product
    for (const lineItem of this.products) {
      await Product.updateOne(
        { _id: lineItem.productId },
        { $inc: { stock: -lineItem.quantity } }
      );
    }
    next();
  } catch (error) {
    throw error;
  }
});

export const Order = mongoose.model<IOrder>('order', orderSchema);
