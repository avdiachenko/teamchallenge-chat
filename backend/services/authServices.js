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
  return User.findByIdAndUpdate(id, { token, refreshToken }, { new: true });
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
    {
      password: hashPassword,
      $unset: { tempCode: "", tempCodeTime: "" },
      // $unset: { tempCode },
    } //$unset — оператор, который удаляет указанное поле из документа. Значение в $unset не имеет значения (можно использовать пустую строку или null), главное указать имя поля.MongoDB ожидает, что объект $unset будет единым, и все поля для удаления должны быть указаны в нем.
  );
}
