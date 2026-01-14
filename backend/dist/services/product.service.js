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
const product_model_1 = require("../models/product.model");
//Get all products
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find();
});
// Get product by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id);
});
// Get products by category
const getByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (!category || typeof category !== "string") {
        return [];
    }
    return yield product_model_1.Product.find({
        category: { $regex: category, $options: "i" },
    });
});
// Add product
const add = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.create(newProduct);
});
// Update Product by id
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(id, data, {
        new: true,
    });
});
// delete product
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndDelete(id);
});
exports.default = {
    getAll,
    getByCategory,
    getById,
    add,
    update,
    remove,
};
