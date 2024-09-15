import Joi from "joi";

export const createComplexSchema = Joi.object({
  parking: Joi.boolean().required(),
  security: Joi.boolean().required(),
  access_control: Joi.boolean().required(),
  concierge: Joi.boolean().required(),
  playground: Joi.boolean().required(),
  closed_area: Joi.boolean().required(),
  video_surveillance: Joi.boolean().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  buildings: Joi.array().items({
    address: Joi.string().required(),
    entrances: Joi.array().items({
      number: Joi.number().required(),
      apartment_min: Joi.number().required(),
      apartment_max: Joi.number().required(),
    }),
  }),

});
