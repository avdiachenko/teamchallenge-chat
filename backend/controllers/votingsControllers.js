import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { addVoting, votingsList } from "../services/votingsServices.js";

const createVoting = async (req, res) => {
  const user = req.user;
  if (user.role !== "moderator") {
    throw HttpError(403, "You don't have access to this action!");
  }
  const result = await addVoting(req.body);
  console.log(result);
  res.status(201).json(result);
};

const getVotings = async (req, res) => {
  const { role } = req.user;
  if (role === "not_verified") {
    throw HttpError(403, "You don't have access to this action!");
  }
  const { page = 1, limit = 20, votingType = "Number" } = req.query;
  const skip = (page - 1) * limit;
  const result = await votingsList({ skip, limit });
  console.log(result);
  res.json(result);
};

export default {
  createVoting: ctrlWrapper(createVoting),
  getVotings: ctrlWrapper(getVotings),
};
