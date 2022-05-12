import * as Joi from 'joi';

const donorSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string().min(1).max(255),
  address: Joi.string().min(1).max(255),
});

export default donorSchema;
