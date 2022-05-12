import * as Joi from 'joi';

const familySchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

export default familySchema;
