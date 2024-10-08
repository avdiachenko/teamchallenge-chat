import HttpError from "../helpers/HttpError.js";
import Roles from "../helpers/Roles.js";

// to be used after "authenticate"
const authorizeForRole = (role) => {
  return (req, res, next) => {
    const user = req.user;

    if (Roles.compareRoles(role, user.role) < 0) {
      throw HttpError(403, "You don't have access to this action!");
    } else {
      next();
    }
  }
};

export const authorizeSocketForRole = (role) => {
  return (socket, next) => {
    const user = socket.user;

    if (!user || Roles.compareRoles(role, user.role) < 0) {
      next(Error(403, "You don't have access to this action!"));
    } else {
      next();
    }
  }
};

export default authorizeForRole;
