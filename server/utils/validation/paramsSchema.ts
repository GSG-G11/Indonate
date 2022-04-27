import * as Joi from 'joi';

const paramsSchema = Joi.object({
  id: Joi.number().required(),
});

export default paramsSchema;
