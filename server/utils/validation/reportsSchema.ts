import * as Joi from 'joi';

const reportsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .max(250)
    .min(4)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  message: Joi.string().required(),
});

export default reportsSchema;
