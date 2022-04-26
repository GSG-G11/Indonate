import Joi from 'joi';

const querySchema = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
});
export default querySchema;
