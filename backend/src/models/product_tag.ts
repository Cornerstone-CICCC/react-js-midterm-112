import mongoose, { Schema, Document } from "mongoose";

export interface IProductTag extends Document {
  productId: mongoose.Types.ObjectId;
  tagId: mongoose.Types.ObjectId;
}

const ProductTagSchema: Schema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    tagId: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  {
    timestamps: true,
  },
);

ProductTagSchema.index({ productId: 1, tagId: 1 }, { unique: true });

export const ProductTag = mongoose.model<IProductTag>(
  "ProductTag",
  ProductTagSchema,
);
