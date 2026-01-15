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
const product_service_1 = __importDefault(require("../services/product.service"));
//Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.default.getAll();
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Get product by productId - use for each product and show the detail
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.default.getById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Get products by category
const getProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.default.getByCategory(req.query.category);
        if (!products) {
            res.status(404).json({ message: "Products not found" });
            return;
        }
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// add product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    if (!productData || Object.keys(productData).length === 0) {
        return res.status(400).json({ message: "No product data provided" });
    }
    try {
        const newProduct = yield product_service_1.default.add(productData);
        if (!newProduct) {
            res.status(500).json({ message: "Unable to add Product" });
            return;
        }
        res.status(201).json(newProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// edit product by id
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No data provided to update" });
    }
    try {
        const updatedProduct = yield product_service_1.default.update(id, updates);
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// delete product by id
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_service_1.default.remove(req.params.id);
        if (!deletedProduct) {
            res.status(500).json({ message: "Unable to delete product" });
            return;
        }
        res.status(200).json(deletedProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllProducts,
    getProductByCategory,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
