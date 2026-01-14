import { IProduct, Product } from "../models/product.model";

//Get all products
const getAll = async () => {
  return await Product.find();
};

// Get products by category
const getByCategory = async (category: string) => {
  if (!category || typeof category !== "string") {
    return [];
  }

  return await Product.find({
    category: { $regex: category, $options: "i" },
  });
};

export default {
  getAll,
  getByCategory,
};
