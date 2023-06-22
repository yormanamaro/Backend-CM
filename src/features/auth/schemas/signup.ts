// para cuando un paciente se registre.
import Joi, {ObjectSchema} from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(7).max(7).messages({
    'string.base': 'ALERT Invalid value minimum and maximum 7 characters',
    'string.min': 'ALERT username must be between',
    'string.max': 'ALERT Invalid value minimum and maximum 7 characters',
    'string.empty': 'ALERT  cannot be empty',
  }),
  password: Joi.string().required().min(7).max(7).messages({
    'string.base': 'ALERT password invalid value minimum and maximum 7 characters',
    'string.min': 'ALERT password must be between',
    'string.max': 'ALERT invalid value minimum and maximum 7 characters',
    'string.empty': 'ALERT password cannot be empty',
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'ALERT email invalid value',
    'string.email': 'ALERT email us not allowed',
    'string.empty': 'ALERT email is a required field',
  }),
  avatarColor: Joi.string().required().messages({
    'any.required': 'Avatar color ir required',
  }),  
});

export { signupSchema };