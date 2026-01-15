import { Request, Response } from "express";
import cartService from "../services/cart.service";
import { ICart } from "../models/cart.model";

// Get cart items by userId
const getCartItems = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const items = await cartService.getItems(req.params.id);
    if (!items) {
      res.status(404).json({ message: "No items in the cart" });
      return;
    }
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add, increase items in the cart
const increaseItem = async (req: Request<{}, ICart>, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    const newItem = await cartService.add(userId, productId, quantity);
    if (!newItem) {
      res.status(500).json({ message: "Unable to add items" });
      return;
    }
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Decrase item in the cart - when you click '-' button
const decreaseItem = async (
  req: Request<{}, Partial<ICart>>,
  res: Response,
) => {
  const { userId, productId } = req.body;

  try {
    const updatedItem = await cartService.decrease(userId, productId);
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete item in the cart
const deleteItem = async (req: Request<{}, Partial<ICart>>, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const deletedItem = await cartService.remove(userId, productId);
    res.status(200).json(deletedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getCartItems,
  increaseItem,
  decreaseItem,
  deleteItem,
};
