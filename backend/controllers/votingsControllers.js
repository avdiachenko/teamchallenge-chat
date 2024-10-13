import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { addVoting } from "../services/votingServices.js";

const createVoting = async (req, res) => {
  const user = req.user;
  if (user.role !== "moderator") {
    throw HttpError(403, "You don't have access to this action!");
  }
  const result = await addVoting(req.body);
  console.log(data);
  res.status(201).json(result);
};

export default {
  createVoting: ctrlWrapper(createVoting),
};
