import * as Joi from 'joi';

const pageSchema = Joi.object({
  page: Joi.string().required(),
});

export default pageSchema;
