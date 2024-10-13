import express from "express";
import votingsControllers from "../controllers/votingsControllers.js";
import validateBody from "../decorators/validateBody.js";
import authtenticate from "../middlewares/authenticate.js";

const votingsRouter = express.Router();

votingsRouter.use(authtenticate);

const { createVoting } = votingsControllers;

votingsRouter.post("/", createVoting);

export default votingsRouter;
