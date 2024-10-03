import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  addNotification,
  listNotificationsByFilter,
} from "../services/notificationsServices.js";

const createNotification = async (req, res) => {
  const user = req.user;
  const { residential_complex } = user;
  console.log(user);
  if (!user.role) {
    throw HttpError(403, "You don't have access to this action!");
  }
  const result = await addNotification({ ...req.body, residential_complex });
  res.status(201).json(result);
};

const getNotifications = async (req, res) => {
  console.log(req.query);
  const user = req.user;
  const { residential_complex } = user;
  const { page = 1, limit = 20, type = "" } = req.query;
  const skip = (page - 1) * limit;
  const result = type
    ? await listNotificationsByFilter(
        { residential_complex, type },
        { skip, limit }
      )
    : await listNotificationsByFilter({ residential_complex }, { skip, limit });

  res.json(result);
};

export default {
  createNotification: ctrlWrapper(createNotification),
  getNotifications: ctrlWrapper(getNotifications),
};
