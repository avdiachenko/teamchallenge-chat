import Joi from "joi";

export const createNotificationSchema = Joi.object({
  text: Joi.string().required(),
  type: Joi.string().required(),
  section: Joi.string(),
});
