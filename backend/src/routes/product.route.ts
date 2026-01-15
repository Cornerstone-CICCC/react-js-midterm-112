import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/category", productController.getProductByCategory);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.addProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
