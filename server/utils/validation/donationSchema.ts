import * as Joi from 'joi';

const donationSchema = Joi.object({
  food: Joi.number().min(1),
  clothes: Joi.number().min(1),
  money: Joi.number().min(1),
  description: Joi.string().min(1).max(255),
  location: Joi.string().min(1).max(255).required(),
  deliver_time: Joi.date().required(),
});

export default donationSchema;
