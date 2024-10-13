import Voting from "../models/Voting";

export const addVoting = (data) => {
  return Voting.create(data);
};
