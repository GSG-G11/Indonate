import * as Joi from 'joi';

const addFamilySchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

export default addFamilySchema;
