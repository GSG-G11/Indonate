import Joi from 'joi';

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().max(250).min(4).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().max(50).min(3).required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  is_admin: Joi.boolean(),
});

export default signUpSchema;
