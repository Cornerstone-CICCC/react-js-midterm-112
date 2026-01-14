import { Router } from "express";
import cartController from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post("/increase", cartController.increaseItem);
cartRouter.post("/decrease", cartController.decreaseItem);
cartRouter.delete("/delete", cartController.deleteItem);
cartRouter.get("/:id", cartController.getCartItems);

export default cartRouter;
