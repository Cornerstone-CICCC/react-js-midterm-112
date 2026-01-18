import { Router } from "express";
import productController from "../controllers/product.controller";
import { checkAdminPage } from "../middleware/auth.middleware";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/category", productController.getProductByCategory);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", checkAdminPage, productController.addProduct);
productRouter.put("/:id", checkAdminPage, productController.updateProduct);
productRouter.delete("/:id", checkAdminPage, productController.deleteProduct);

export default productRouter;
