import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isObjectIdValid } from '../utils/validateObjectId';

export const IsObjectId = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any) => isObjectIdValid(value),
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid ID format`;
        }
      }
    });
  };
};