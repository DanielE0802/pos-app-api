import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { fileExtensions } from '../constants/file';

export function IsFileExtension(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFileExtension',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return fileExtensions.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `The value for ${args.property} must be either ${fileExtensions.join(' | ')}`;
        },
      },
    });
  };
}
