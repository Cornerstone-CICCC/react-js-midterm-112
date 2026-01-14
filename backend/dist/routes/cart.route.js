"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const cartRouter = (0, express_1.Router)();
cartRouter.post("/increase", cart_controller_1.default.increaseItem);
cartRouter.post("/decrease", cart_controller_1.default.decreaseItem);
cartRouter.delete("/delete", cart_controller_1.default.deleteItem);
cartRouter.get("/:id", cart_controller_1.default.getCartItems);
exports.default = cartRouter;
