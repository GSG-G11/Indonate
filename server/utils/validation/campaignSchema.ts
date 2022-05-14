import Joi from 'joi';

const campaignSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  food_target: Joi.number().required(),
  clothes_target: Joi.number().required(),
  money_target: Joi.number().required(),
  image_link: Joi.string().required(),
  categoryId: Joi.number().required(),
});
export default campaignSchema;
