import CRUDController from '../crud.controller';
import Product, { IProduct } from './product.model';

class ProductController extends CRUDController<IProduct> {
  constructor() {
    super(Product);
  }
}

export default new ProductController();
