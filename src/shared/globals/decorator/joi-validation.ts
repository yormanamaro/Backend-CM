import { JoiRequestValidateError } from '@helpers/errors/joiValidateError';
import { Request } from 'express';
import { ObjectSchema } from 'joi';

type IJoiDecorator = (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => void; //decorador de joi.

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: [Request]) {
      const req: Request = args[0];
      const {error} = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiRequestValidateError(error.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}