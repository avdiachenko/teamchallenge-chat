import jwt from "jsonwebtoken";
import { findUserById } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const authtenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return next(HttpError(401));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(id);
    if (!user || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export async function authenticateSocket(socket, next) {
  const token = socket.handshake.auth.token;
  const user_id = jwt.verify(token, JWT_SECRET).id;
  socket.user = await findUserById(user_id);
  next();
}

export default authtenticate;
