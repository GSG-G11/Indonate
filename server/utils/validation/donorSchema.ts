import * as Joi from 'joi';

const donorSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().min(1).max(255),
  phone: Joi.string().min(1).max(255),
  address: Joi.string().min(1).max(255),
});

export default donorSchema;
