import { IProduct, Product } from "../models/product.model";

//Get all products
const getAll = async () => {
  return await Product.find();
};

// Get product by id
const getById = async (id: string) => {
  return await Product.findById(id);
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

// Add product
const add = async (newProduct: IProduct) => {
  return await Product.create(newProduct);
};

// Update Product by id
const update = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// delete product
const remove = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  getAll,
  getByCategory,
  getById,
  add,
  update,
  remove,
};
