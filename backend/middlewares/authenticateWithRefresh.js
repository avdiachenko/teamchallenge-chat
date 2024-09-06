import jwt from "jsonwebtoken";
import { findUserById } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const authenticateWithRefresh = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const [bearer, refreshToken] = authorization.split(" ");
  console.log(bearer);
  console.log(refreshToken);
  if (bearer !== "Bearer") {
    return next(HttpError(401, "No Bearer"));
  }
  try {
    const { id } = jwt.verify(refreshToken, JWT_SECRET);
    console.log(id);
    const user = await findUserById(id);
    if (!user || !user.refreshToken) {
      return next(HttpError(401, "Not authorized user"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "No refreshToken"));
  }
};

export default authenticateWithRefresh;
