import express from "express";
import chatControllers from "../controllers/chatControllers.js";
import validateBody from "../decorators/validateBody.js";
import authtenticate from "../middlewares/authenticate.js";
import authorizeForRole from "../middlewares/authorize.js";

const chatRouter = express.Router();

chatRouter.use(authtenticate);
chatRouter.use(authorizeForRole("verified"));

const { getLastChatMessages } = chatControllers;

chatRouter.get("/last_messages", getLastChatMessages);

export default chatRouter;
