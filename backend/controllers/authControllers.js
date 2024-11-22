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
import {
  findUser,
  updateByFilter,
  updateById,
  updateUserById,
} from "../services/userServices.js";
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
const DELAY = 60 * 1000;

const signup = async (req, res) => {
  const { email, apartment, entrance, residential_complex, section, role } =
    req.body;

  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const userAdress = section.toLowerCase();

  const [{ _id: residential_complex_id }] = await getComplex({
    name: residential_complex,
  });

  const data = await getBuilding({
    residential_complex_id,
    address: userAdress,
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

  const [apartmentResult] = apartmentData;

  await register({
    ...req.body,
    section: userAdress,
    apartment_id: apartmentResult._id,
  });
  res.status(201).json({
    message: "Congratulations! You have registered successfully. Please login.",
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  let user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare && user.role !== "administrator") {
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
  const loggedInUser = await findUser({ _id: user._id }, "-password");

  user = loggedInUser;
  res.json({
    token,
    refreshToken,
    user,
  });
};

const getCurrent = async (req, res) => {
  const userRes = { ...req.user };
  delete userRes._doc.password;
  const user = userRes._doc;
  console.log(req.user);
  res.json(user);
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
  const tempCodeTime = Date.now() + DELAY;

  await updateUser({ email }, { tempCode, tempCodeTime });
  const userEmail = {
    to: email,
    subject: "Forgot password",
    html: `
        <h1>Hello, did you forget your password?</h1>
        <p>If no, ignore this email.</p>
        <p>Otherwise, please click on the link below, <span style="font-weight: bold;">but remember that this link will expire in <span style="color: red;">${
          DELAY / 60000
        } min</span></p>
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
  if (user.tempCodeTime < Date.now()) {
    throw HttpError(
      403,
      "Unfortunately, your link has expired, so you can't access this action. Try to recover your password again."
    );
  }

  await recoverPassword(tempCode, {
    password: newPassword,
  });

  res.status(200).json({
    message: "Your password has been updated successfully",
  });
};

const verify = async (req, res) => {
  const { role, id } = req.params;
  const admin = req.user;

  if (
    (admin.role !== "moderator" && admin.role !== "administrator") ||
    (admin.role === "moderator" && role === "moderator")
  ) {
    throw HttpError(403, "You don't have access to this action!");
  }
  await updateByFilter({ _id: id }, { role });

  const { email, name } = await findUser({ _id: id });
  const userEmail = {
    to: email,
    subject: "Your account has been successfully verified",
    html: `
        <h1>Hello, ${name}</h1>
        <p>Your account has been successfully verified. Now you can use all the features of our application. If you have any questions, you can always contact our support team.</p>
        <p style="margin-top: 10px;">Best regards,</p>
        <p style="margin-top: 10px;">The Teamchallenge Chat Team</p>
        `,
  };

  await sendEmail(userEmail);

  res.json({
    message: "Verification successful",
  });
};

const updateUserInfo = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "At least one field must not be empty!");
  }

  const { _id, residential_complex, apartment_id } = req.user;
  const { section, apartment } = req.body;

  const [{ _id: residential_complex_id }] = await getComplex({
    name: residential_complex,
  });

  let address;
  if (section) {
    address = section.toLowerCase();
    const userAddress = await getBuilding({ residential_complex_id, address });
    if (userAddress.length === 0) {
      throw HttpError(
        400,
        `The section ${section} does not exist! Enter the correct section data in the format like this 1a, 2B, etc.`
      );
    }
    const [{ _id: building_id }] = userAddress;
    if (apartment) {
      const userApatment = await getApartment({
        building_id,
        number: apartment,
      });
      if (userApatment.length === 0) {
        throw HttpError(
          400,
          `The apartment ${apartment} does not exist! Please, enter the correct apartment data`
        );
      }
    }
  }
  if (!section && apartment) {
    const [{ building_id }] = await getApartment({ _id: apartment_id });

    const userApatment = await getApartment({ building_id, number: apartment });
    if (userApatment.length === 0) {
      throw HttpError(
        400,
        `The apartment ${apartment} does not exist! Please, enter the correct apartment data`
      );
    }
  }
  // const result = await updateById({ _id }, req.body, {
  const result = await updateUserById(
    { _id },
    { ...req.body, section: address },
    {
      projection: { password: 0 }, //for excluding the field password mast be {projection: { password: 0 }}
    }
  );

  const { email, name } = await findUser({ _id });
  const userEmail = {
    to: email,
    subject: "Your account has been successfully updated",
    html: `<h1>Hello, ${name}</h1>
        <p>Your account has been successfully updated. Now you can use your new credentials. If you have any questions, you can always contact our support team.</p>
        <p style="margin-top: 10px;">Best regards,</p>
        <p style="margin-top: 10px;">The Teamchallenge Chat Team</p>
`,
  };
  await sendEmail(userEmail);

  res.status(200).json(result);
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  getrefreshCurrent: ctrlWrapper(getrefreshCurrent),
  logout: ctrlWrapper(logout),
  forgotPassword: ctrlWrapper(forgotPassword),
  updatePassword: ctrlWrapper(updatePassword),
  verify: ctrlWrapper(verify),
  updateUserInfo: ctrlWrapper(updateUserInfo),
};
