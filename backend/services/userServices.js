import User from "../models/User.js";
import bcrypt from "bcrypt";

export const findUser = (filter, config) => User.findOne(filter, config);

export const findUserById = (id) => User.findById(id);

export const updateByFilter = (filter, data) =>
  User.findOneAndUpdate(filter, data);

export const updateById = (id, data, config) =>
  User.findOneAndUpdate(id, data, config);

export async function updateUserById(id, data, config) {
  if (data.password) {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10); // const salt = await bcrypt.genSalt(10);
    return User.findOneAndUpdate(
      id,
      { ...data, password: hashPassword },
      config,
      { new: true }
    );
  } else {
    return User.findOneAndUpdate(id, data, config, { new: true });
  }
}
