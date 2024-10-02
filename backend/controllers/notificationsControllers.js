import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { addNotification } from "../services/notificationsServices.js";

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

export default {
  createNotification: ctrlWrapper(createNotification),
};
