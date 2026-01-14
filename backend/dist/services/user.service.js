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
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Get all users
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
//Get user by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
//Get user by loginId
const getByLoginId = (loginId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ loginId });
});
// Add new user
const add = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginId, password, firstname, lastname } = newUser;
    if (!loginId || !password || !firstname || !lastname)
        return false;
    // check if there's already existed loginId
    const foundUser = yield getByLoginId(loginId);
    if (foundUser)
        return false;
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    return yield user_model_1.User.create({
        loginId,
        password: hashedPassword,
        firstname,
        lastname,
    });
});
//update user
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, data, {
        new: true,
    });
});
// Delete user
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndDelete(id);
});
// Login user
const login = (details) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginId, password } = details;
    const foundUser = yield getByLoginId(loginId);
    if (!foundUser)
        return false;
    const isMatch = yield bcrypt_1.default.compare(password, foundUser.password);
    if (!isMatch)
        return false;
    return foundUser;
});
exports.default = {
    getAll,
    getById,
    getByLoginId,
    add,
    update,
    remove,
    login,
};
