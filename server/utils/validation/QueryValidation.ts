import Joi from 'joi';

const querySchema = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  available: Joi.boolean(),
  category: Joi.string(),
  search: Joi.string(),
});
export default querySchema;
