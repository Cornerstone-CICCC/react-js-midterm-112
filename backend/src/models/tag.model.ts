import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  tag: string;
}

const TagSchema: Schema = new Schema(
  {
    tag: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const Tag = mongoose.model<ITag>("Tag", TagSchema);
