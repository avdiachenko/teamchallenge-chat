import express from "express";
import chatControllers from "../controllers/chatControllers.js";
import validateBody from "../decorators/validateBody.js";
import authtenticate from "../middlewares/authenticate.js";
import authorizeForRole from "../middlewares/authorize.js";

const chatRouter = express.Router();

chatRouter.use(authtenticate);
chatRouter.use(authorizeForRole("verified"));

const { getLastChatMessages, getChats } = chatControllers;

// TODO: give access only to chats where user is registered
chatRouter.get("/last_messages", getLastChatMessages);
chatRouter.get("/", getChats);

export default chatRouter;
