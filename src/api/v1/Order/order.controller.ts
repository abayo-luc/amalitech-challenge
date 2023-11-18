import CRUDController from '../crud.controller';
import { IOrder, Order } from './order.model';

class OrderController extends CRUDController<IOrder> {
  constructor() {
    super(Order, ['user', 'products']);
  }
}

export default new OrderController();
