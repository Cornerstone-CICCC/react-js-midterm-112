import { Cart } from "../models/cart.model";
import { IProduct } from "../models/product.model";

// Get cart items by userId
const getItems = async (userId: string) => {
  const items = await Cart.find({ userId })
    .populate<{ productId: IProduct }>("productId")
    .lean();
  if (!items) return [];
  // items.forEach((i) => {
  //   console.log(i.productId.price * i.quantity);
  // });
  return items;
};

// add, increase item
// if you click '+' button, you need to set the quantity '1'
const add = async (userId: string, productId: string, quantity: number) => {
  return await Cart.findOneAndUpdate(
    // if a product is already existed in the cart, do not increase the row
    { userId, productId },
    { $inc: { quantity: quantity } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
};

// decrease the number of item in the cart when you click '-' button
const decrease = async (userId: string, productId: string) => {
  const item = await Cart.findOne({ userId, productId });
  if (!item) return null;

  // if the quantity is lower than 1, it will be removed in the cart
  if (item.quantity <= 1) {
    return await Cart.deleteOne({ userId, productId });
  }

  return await Cart.findOneAndUpdate(
    { userId, productId },
    { $inc: { quantity: -1 } },
    { new: true },
  );
};

// remove the item in the cart
const remove = async (userId: string, productId: string) => {
  return await Cart.deleteOne({ userId, productId });
};

export default {
  getItems,
  add,
  decrease,
  remove,
};
