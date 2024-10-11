import Joi from "joi";

export const createNotificationSchema = Joi.object({
  text: Joi.string().required(),
  type: Joi.string().valid("Events", "Emergency").required(),
  section: Joi.string(),
});
