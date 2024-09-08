import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  residential_complex: Joi.string().required(),
  apartment: Joi.number().required(),
  entrance: Joi.number().required(),
  phone: Joi.string(),
});

export const signinSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});
