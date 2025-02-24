import { Poll, PollOption } from "./votings.types";

export const getVoteOption = (pollId: string, optionId: string, polls: Poll[] | null) => {
  const choosenPoll = polls?.find((poll) => poll._id === pollId);
  const selectedPoll = choosenPoll?.options?.find((option) => option._id === optionId);
  const selectedPollCopy = { ...selectedPoll };

  (selectedPollCopy as PollOption).quantity = true;
  const clearedPolls = choosenPoll?.options?.filter((option) => option._id !== optionId);


  return { _id: pollId, options: [...(clearedPolls ?? []), selectedPollCopy] };
};
