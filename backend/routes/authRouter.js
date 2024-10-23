import express from "express";
import {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  updateRoleSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import authtenticate from "../middlewares/authenticate.js";
import authenticateWithRefresh from "../middlewares/authenticateWithRefresh.js";
import isValidId from "../middlewares/isValidId.js";
import trimSpases from "../middlewares/trimSpases.js";

const authRouter = express.Router();

const {
  signup,
  signin,
  getCurrent,
  getrefreshCurrent,
  logout,
  forgotPassword,
  updatePassword,
  verify,
} = authControllers;

authRouter.post("/register", trimSpases, validateBody(signupSchema), signup);
authRouter.post("/login", trimSpases, validateBody(signinSchema), signin);
authRouter.get("/user-info", authtenticate, getCurrent);
authRouter.get("/refreshCurrent", authenticateWithRefresh, getrefreshCurrent);
authRouter.post("/logout", authtenticate, logout);
authRouter.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  forgotPassword
);
authRouter.post(
  "/update-password/:tempCode",
  validateBody(updatePasswordSchema),
  updatePassword
);
authRouter.patch(
  "/verify/:role/:id",
  isValidId,
  authtenticate,
  validateBody(updateRoleSchema),
  verify
);

export default authRouter;
