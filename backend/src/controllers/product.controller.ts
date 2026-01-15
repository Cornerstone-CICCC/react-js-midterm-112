import { Request, Response } from "express";
import productService from "../services/product.service";
import { IProduct } from "../models/product.model";

//Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by productId - use for each product and show the detail
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get products by category
const getProductByCategory = async (
  req: Request<{}, {}, {}, { category: string }>,
  res: Response,
) => {
  try {
    const products = await productService.getByCategory(req.query.category);
    if (!products) {
      res.status(404).json({ message: "Products not found" });
      return;
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// add product
const addProduct = async (req: Request<{}, IProduct>, res: Response) => {
  const productData = req.body;

  if (!productData || Object.keys(productData).length === 0) {
    return res.status(400).json({ message: "No product data provided" });
  }

  try {
    const newProduct = await productService.add(productData);
    if (!newProduct) {
      res.status(500).json({ message: "Unable to add Product" });
      return;
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// edit product by id
const updateProduct = async (
  req: Request<{ id: string }, Partial<IProduct>>,
  res: Response,
) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const updatedProduct = await productService.update(id, updates);

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// delete product by id
const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deletedProduct = await productService.remove(req.params.id);
    if (!deletedProduct) {
      res.status(500).json({ message: "Unable to delete product" });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllProducts,
  getProductByCategory,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
