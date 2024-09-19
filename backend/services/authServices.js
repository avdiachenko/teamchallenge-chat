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

export async function updateUser(filter, data) {
  if (data.newPassword) {
    const { newPassword: password } = data;
    const hashPassword = await bcrypt.hash(password, 10); // const salt = await bcrypt.genSalt(10);
    return User.findOneAndUpdate(
      filter,
      { ...data, password: hashPassword },
      { new: true }
    );
  } else {
    return User.findOneAndUpdate(filter, data, { new: true });
  }
}

export async function recoverPassword(tempCode, data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.findOneAndUpdate(
    { tempCode },
    { password: hashPassword, $unset: { tempCode } } //$unset — оператор, который удаляет указанное поле из документа
  );
}
