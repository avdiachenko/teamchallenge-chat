import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const findUserById = (id) => User.findById(id);

export const updateSubscriptionByFilter = (filter, data) =>
  User.findOneAndUpdate(filter, data);
