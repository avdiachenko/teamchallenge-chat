import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function register(data) {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const hash = { ...data, password: hashPassword };
  return User.create(hash);
}

export function setToken(id, token = "") {
  return User.findByIdAndUpdate(id, { token });
}
export function setTokens(id, token = "", refreshToken = "") {
  return User.findByIdAndUpdate(id, { token, refreshToken });
}
