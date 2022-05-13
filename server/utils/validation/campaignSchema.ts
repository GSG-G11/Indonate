import Joi from 'joi';

const campaignSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  food_target: Joi.number().min(1),
  clothes_target: Joi.number().min(1),
  money_target: Joi.number().min(1),
  image_link: Joi.string().required(),
  categoryId: Joi.number().required(),
});

export default campaignSchema;
