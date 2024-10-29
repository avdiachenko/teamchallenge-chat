import express from "express";
import votingsControllers from "../controllers/votingsControllers.js";
import validateBody from "../decorators/validateBody.js";
import authtenticate from "../middlewares/authenticate.js";
import { createVotingSchema } from "../schemas/votingsSchemas.js";

const votingsRouter = express.Router();

votingsRouter.use(authtenticate);

const { createVoting, getVotings, vote } = votingsControllers;

votingsRouter.post("/", validateBody(createVotingSchema), createVoting);
votingsRouter.get("/", getVotings);
votingsRouter.patch("/:votingId", vote);

export default votingsRouter;
