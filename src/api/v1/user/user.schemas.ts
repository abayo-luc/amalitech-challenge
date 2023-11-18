import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, record) => {
        delete record.password;
        return record;
      },
    },
    timestamps: true,
  }
);
