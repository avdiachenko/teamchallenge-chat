import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  addVote,
  addVoting,
  findVotingById,
  votingsList,
} from "../services/votingsServices.js";

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
  const {
    page = 1,
    limit = 20,
    displayType = "Number",
    status = "active",
  } = req.query;
  const skip = (page - 1) * limit;

  const result = await votingsList({ skip, limit, status });
  // console.log(result);
  if (displayType === "Percentages") {
    const resInPercents = result.map((item) => {
      // console.log(item);
      const total = item.options.reduce(
        (akk, option) => akk + option.quantity,
        0
      );
      console.log(total);
      const optionsInPercents = item.options.map((option) => {
        const percentQuantity = Math.round((option.quantity / total) * 100);
        option.quantity = percentQuantity;
        return option;
      });
      item.options = optionsInPercents;
      // console.log(item.options);
      return item;
    });

    res.json(resInPercents);
  } else {
    res.json(result);
  }
};

const vote = async (req, res) => {
  const { _id, role } = req.user;
  if (role === "not_verified") {
    throw HttpError(403, "You don't have access to this action!");
  }
  const { votingId } = req.params;
  const { options } = req.body;
  console.log(options);
  const newOptions = options.map(
    (option) => (option.quantity = option.quantity ? 1 : 0)
  );
  // options = newOptions;
  console.log(newOptions);
  const { options: oldOptions } = await findVotingById({ _id: votingId });
  const optionsAfterVoting = oldOptions.map((oldOption, idx) => {
    const newQuantity = oldOption.quantity + newOptions[idx];
    console.log(newQuantity);
    oldOption.quantity = newQuantity;
    console.log(oldOption);
    // const newOption = { ...oldOption, quantity: newQuantity };
    // console.log(newOption);
    return oldOption;
  });
  const result = await addVote(
    { _id: votingId },
    { options: optionsAfterVoting }
  );
  res.json(result);
};

export default {
  createVoting: ctrlWrapper(createVoting),
  getVotings: ctrlWrapper(getVotings),
  vote: ctrlWrapper(vote),
};
