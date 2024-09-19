import express from "express";
import {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import authtenticate from "../middlewares/authenticate.js";
import authenticateWithRefresh from "../middlewares/authenticateWithRefresh.js";

const authRouter = express.Router();

const {
  signup,
  signin,
  getCurrent,
  getrefreshCurrent,
  logout,
  forgotPassword,
} = authControllers;

authRouter.post("/register", validateBody(signupSchema), signup);
authRouter.post("/login", validateBody(signinSchema), signin);
authRouter.get("/user-info", authtenticate, getCurrent);
authRouter.get("/refreshCurrent", authenticateWithRefresh, getrefreshCurrent);
authRouter.post("/logout", authtenticate, logout);
authRouter.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  forgotPassword
);

export default authRouter;
