import Joi from "joi";

// const condition = (field) =>
//   Joi.string().when("rights", {
//     is: "administrator",
//     then: Joi.string().optional(), // if the condition is met
//     otherwise: Joi.string().required(),
//   });

export const signupSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string()

    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
    .required()
    // .trim()
    .error(
      (errors) =>
        new Error(
          "The password may contain at least one upper case, one lower case English letter, one digit, and have a length of at least 8 characters"
        )
    ),
  // address: Joi.boolean(),
  // rights: Joi.string().valid("administrator"),
  // residential_complex: condition("residential_complex"),
  residential_complex: Joi.string(),
  section: Joi.string().required(),
  entrance: Joi.number().required(),
  apartment: Joi.number().required(),
  phone: Joi.string().required().trim(),
  role: Joi.string(),
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

export const addAddressSchema = Joi.object({
  residential_complex: Joi.string().required(),
  section: Joi.string().required(),
  entrance: Joi.number().required(),
  apartment: Joi.number().required(),
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

export const updateRoleSchema = Joi.object({
  role: Joi.string(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
    .error(
      (errors) =>
        new Error(
          "The password may contain at least one upper case, one lower case English letter, one digit, and have a length of at least 8 characters"
        )
    ),
  apartment: Joi.number(),
  section: Joi.string(),
  phone: Joi.string(),
});
