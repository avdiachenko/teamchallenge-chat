import Joi from "joi";

// const createOptionsSchema = Joi.object({
//   up: Joi.number().default(0),
//   down: Joi.number().default(0),
//   abstained: Joi.number().default(0),
// });

const createOptionSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number(),
});

export const createVotingSchema = Joi.object({
  headline: Joi.string().required(),
  description: Joi.string(),
  votingType: Joi.string().valid("Single", "Multiple").required(),
  options: Joi.array().items(createOptionSchema).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date(),
  displayType: Joi.string().valid("Percentages", "Number").required(),
  isAnonymous: Joi.boolean().default(true),
});
