import { IUser, User } from "../models/user.model";
import bcrpyt from "bcrypt";
import { ILoginDTO } from "../types/loginDTO";

// Get all users
const getAll = async () => {
  return await User.find();
};

//Get user by id
const getById = async (id: string) => {
  return await User.findById(id);
};

//Get user by loginId
const getByLoginId = async (loginId: string) => {
  return await User.findOne({ loginId });
};

// Add new user
const add = async (newUser: Partial<IUser>) => {
  const { loginId, password, firstname, lastname } = newUser;
  if (!loginId || !password || !firstname || !lastname) return false;

  // check if there's already existed loginId
  const foundUser = await getByLoginId(loginId);
  if (foundUser) return false;

  const hashedPassword = await bcrpyt.hash(password, 12);

  return await User.create({
    loginId,
    password: hashedPassword,
    firstname,
    lastname,
  });
};

//update user
const update = async (id: string, data: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// Delete user
const remove = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

// Login user
const login = async (details: ILoginDTO) => {
  const { loginId, password } = details;
  const foundUser = await getByLoginId(loginId);
  if (!foundUser) return false;

  const isMatch = await bcrpyt.compare(password, foundUser.password);
  if (!isMatch) return false;
  return foundUser;
};

export default {
  getAll,
  getById,
  getByLoginId,
  add,
  update,
  remove,
  login,
};
