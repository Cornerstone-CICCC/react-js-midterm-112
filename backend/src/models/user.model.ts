import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  loginId: string;
  password: string;
  firstname: string;
  lastname: string;
}

const UserSchema: Schema = new Schema(
  {
    loginId: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", UserSchema);
