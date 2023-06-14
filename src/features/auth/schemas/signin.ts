// Schema de validacion para cuando ya se inicia la secion
import Joi, {ObjectSchema} from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
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
    'string.empty': 'ALERT username cannot be empty',
  }),  
});

export { loginSchema };