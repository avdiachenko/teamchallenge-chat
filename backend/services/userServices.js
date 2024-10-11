import User from "../models/User.js";

export const findUser = (filter, config) => User.findOne(filter, config);

export const findUserById = (id) => User.findById(id);

export const updateByFilter = (filter, data) =>
  User.findOneAndUpdate(filter, data);
