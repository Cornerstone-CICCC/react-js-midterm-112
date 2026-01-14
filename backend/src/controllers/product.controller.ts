import { Request, Response } from "express";
import productService from "../services/product.service";

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

// // Get products by category
// const getProductByCategory = async(req: Request<{}, {}, {}, {category: string}>, res:Response) => {
//   try{
//     const products = await productService.getByCategory(category)
//   }
// }

export default {
  getAllProducts,
};
