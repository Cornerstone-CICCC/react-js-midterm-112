import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  desc: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  image: string;
  thumbnail: string;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
