import Voting from "../models/Voting.js";

export const addVoting = (data) => {
  return Voting.create(data);
};

export const votingsList = (query) => {
  return Voting.find({}, "", query);
};
