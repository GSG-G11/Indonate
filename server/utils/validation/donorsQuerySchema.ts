import Joi from 'joi';

const donorsQuerySchema = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
});
export default donorsQuerySchema;
