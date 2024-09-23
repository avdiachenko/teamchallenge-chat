import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
    .required()
    .error(
      (errors) =>
        new Error(
          "The password may contain at least one upper case, one lower case English letter, one digit, and have a length of at least 8 characters"
        )
    ),
  residential_complex: Joi.string().required(),
  section: Joi.string().required(),
  apartment: Joi.number().required(),
  entrance: Joi.number().required(),
  phone: Joi.string(),
});

export const signinSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
    .required()
    .error(
      (errors) =>
        new Error(
          "The password may contain at least one upper case, one lower case English letter, one digit, and have a length of at least 8 characters"
        )
    ),
  email: Joi.string().email().required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const updatePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
    .required()
    .error(
      (errors) =>
        new Error(
          "The password may contain at least one upper case, one lower case English letter, one digit, and have a length of at least 8 characters"
        )
    ),
});
