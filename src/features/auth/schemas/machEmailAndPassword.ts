import Joi, {ObjectSchema} from 'joi';

const emailSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required().messages ({
    'string.base': 'Field must be a string',
    'string.required': 'Email is a required field',
    'string.email': 'Email must be a valid email address',
  })
});

const passwordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(7).max(7).messages ({
  'string.base': 'Field must be a string',
  'string.min': 'Password must be at least 7 characters long',
  'string.max': 'Password must be at least 7 characters long',
  'string.empty': 'Password is a required field',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages ({
    'any.only': 'Password must',
    'any.required': 'confirmPassword is a required field',
  })  
});

export {emailSchema, passwordSchema};   