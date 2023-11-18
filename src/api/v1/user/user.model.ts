import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema } from './user.schemas';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // lower case the email
  this.email = this.email.toLowerCase();
  next();
});

export const USER_MODEL_NAME = 'user';
export const User = mongoose.model<IUser>(USER_MODEL_NAME, UserSchema);

export default User;
