"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = require("../models/cart.model");
// Get cart items by userId
const getItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield cart_model_1.Cart.find({ userId })
        .populate("productId")
        .lean();
    if (!items)
        return [];
    // items.forEach((i) => {
    //   console.log(i.productId.price * i.quantity);
    // });
    return items;
});
// add, increase item
// if you click '+' button, you need to set the quantity '1'
const add = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findOneAndUpdate(
    // if a product is already existed in the cart, do not increase the row
    { userId, productId }, { $inc: { quantity: quantity } }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
    });
});
// decrease the number of item in the cart when you click '-' button
const decrease = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield cart_model_1.Cart.findOne({ userId, productId });
    if (!item)
        return null;
    // if the quantity is lower than 1, it will be removed in the cart
    if (item.quantity <= 1) {
        return yield cart_model_1.Cart.deleteOne({ userId, productId });
    }
    return yield cart_model_1.Cart.findOneAndUpdate({ userId, productId }, { $inc: { quantity: -1 } }, { new: true });
});
// remove the item in the cart
const remove = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.deleteOne({ userId, productId });
});
exports.default = {
    getItems,
    add,
    decrease,
    remove,
};
