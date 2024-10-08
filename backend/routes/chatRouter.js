import express from "express";
import chatControllers from "../controllers/chatControllers.js";
import validateBody from "../decorators/validateBody.js";
import authtenticate from "../middlewares/authenticate.js";

const chatRouter = express.Router();

// TODO: check role
chatRouter.use(authtenticate);

const { getLastChatMessages } = chatControllers;

chatRouter.get("/last_messages", getLastChatMessages);

export default chatRouter;
