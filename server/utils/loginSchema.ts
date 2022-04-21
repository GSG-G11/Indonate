import * as Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required().max(250).min(3),
  email: Joi.string()
    .required()
    .max(250)
    .min(4)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});
export default loginSchema;
