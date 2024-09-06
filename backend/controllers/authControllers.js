import { register, setToken, setTokens } from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUser,
  updateSubscriptionByFilter,
} from "../services/userServices.js";
import "dotenv/config"; // Вместо этого можно:
// import dotenv from "dotenv";
// dotenv.config();

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await register(req.body);
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      residential_complex: newUser.residential_complex,
      apartment: newUser.apartment,
      entrance: newUser.entrance,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  await setTokens(user.id, token, refreshToken);
  res.json({
    token,
    refreshToken,
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, email, residential_complex, apartment, entrance, phone } =
    req.user;
  res.json({
    name,
    email,
    residential_complex,
    apartment,
    entrance,
    phone,
  });
};

const getrefreshCurrent = async (req, res) => {
  const user = req.user;
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
  await setTokens(user.id, token, refreshToken);
  res.json({
    token,
    refreshToken,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await setToken(_id);
  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  getrefreshCurrent: ctrlWrapper(getrefreshCurrent),
  logout: ctrlWrapper(logout),
};
