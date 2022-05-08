import Joi from 'joi';

const querySchema = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  available: Joi.boolean(),
  category: Joi.string().allow(''),
  search: Joi.string().allow(''),
});
export default querySchema;
