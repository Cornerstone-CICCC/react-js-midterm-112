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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_1 = __importDefault(require("../services/cart.service"));
// Get cart items by userId
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield cart_service_1.default.getItems(req.params.id);
        if (!items) {
            res.status(404).json({ message: "No items in the cart" });
            return;
        }
        res.status(200).json(items);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Add, increase items in the cart
const increaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        const newItem = yield cart_service_1.default.add(userId, productId, quantity);
        if (!newItem) {
            res.status(500).json({ message: "Unable to add items" });
            return;
        }
        res.status(201).json(newItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Decrase item in the cart - when you click '-' button
const decreaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    try {
        const updatedItem = yield cart_service_1.default.decrease(userId, productId);
        res.status(200).json(updatedItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Delete item in the cart
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    try {
        const deletedItem = yield cart_service_1.default.remove(userId, productId);
        res.status(200).json(deletedItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getCartItems,
    increaseItem,
    decreaseItem,
    deleteItem,
};
