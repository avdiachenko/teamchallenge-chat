import {
  recoverPassword,
  register,
  setToken,
  setTokens,
  updateUser,
} from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUser } from "../services/userServices.js";
import "dotenv/config"; // Вместо этого можно:
// import dotenv from "dotenv";
// dotenv.config();
import { generateRandomCode } from "../helpers/generateRandomCode.js";
import sendEmail from "../helpers/sendEmail.js";
import {
  getApartment,
  getBuilding,
  getComplex,
} from "../services/complexServices.js";

const { JWT_SECRET, DEPLOY_HOST } = process.env;

const signup = async (req, res) => {
  const { email, apartment, entrance, residential_complex, section } = req.body;

  const adress = section.toLowerCase();
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const [{ _id: residential_complex_id }] = await getComplex({
    name: residential_complex,
  });

  const data = await getBuilding({
    residential_complex_id,
    address: adress,
  });
  if (data.length === 0) {
    throw HttpError(
      400,
      `The section ${section} does not exist! Enter the correct section data in the format like this 1a, 2B, etc.`
    );
    return;
  }
  const [result] = data;

  const apartmentData = await getApartment({
    number: apartment,
    entrance,
    building_id: result._id,
  });
  if (apartmentData.length === 0) {
    throw HttpError(
      400,
      `The entrance ${entrance} or the apartment ${apartment} does not exist! Please, enter the correct data.`
    );
  }
  // console.log(apartmentData);
  const [apartmentResult] = apartmentData;

  await register({ ...req.body, apartment_id: apartmentResult._id });
  res.status(201).json({
    message: "Congratulations! You have registered successfully. Please login.",
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
  await setTokens(_id);
  res.status(204).json();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const tempCode = generateRandomCode();

  await updateUser({ email }, { tempCode });
  const userEmail = {
    to: email,
    subject: "Forgot password",
    html: `
        <h1>Hello, did you forget your password?</h1>
        <p>If no, ignore this email.</p>
        <p>Otherwise, please click on the link below:</p>
        <div style="margin-bottom: 20px;">
          <a href="${DEPLOY_HOST}/update-password/${tempCode}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #407bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Click to update your password!</a>
        </div>
        `,
  };

  await sendEmail(userEmail);

  res.json({
    message:
      "An email has been sent to your email address to recover your password",
  });
};

const updatePassword = async (req, res) => {
  const { tempCode } = req.params;
  const { newPassword } = req.body;

  const user = await findUser({ tempCode });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await recoverPassword(tempCode, {
    password: newPassword,
    tempCode: undefined,
  });

  res.status(200).json({
    message: "Your password has been updated successfully",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  getrefreshCurrent: ctrlWrapper(getrefreshCurrent),
  logout: ctrlWrapper(logout),
  forgotPassword: ctrlWrapper(forgotPassword),
  updatePassword: ctrlWrapper(updatePassword),
};
