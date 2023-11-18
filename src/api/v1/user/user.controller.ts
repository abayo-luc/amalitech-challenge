import CRUDController from '../crud.controller';
import User, { IUser } from './user.model';

export class UserController extends CRUDController<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserController();
