import express from "express";
import notificationsControllers from "../controllers/notificationsControllers.js";
import validateBody from "../decorators/validateBody.js";
import authtenticate from "../middlewares/authenticate.js";
import { createNotificationSchema } from "../schemas/notificationsSchemas.js";

const notificationsRouter = express.Router();

notificationsRouter.use(authtenticate);

const { createNotification, getNotifications, getNotificationsByRole } =
  notificationsControllers;

notificationsRouter.post(
  "/",
  validateBody(createNotificationSchema),
  createNotification
);
notificationsRouter.get("/", getNotifications);
notificationsRouter.get("/role", getNotificationsByRole);

export default notificationsRouter;
