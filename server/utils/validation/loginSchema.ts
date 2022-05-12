import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .max(250)
    .min(4)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().max(50).min(6).required(),
});

export default loginSchema;
