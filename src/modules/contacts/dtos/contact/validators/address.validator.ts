import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAddressConstraint implements ValidatorConstraintInterface {
  validate(address: string, args: ValidationArguments) {
    // Aquí puedes realizar la validación que consideres necesaria.
    // Como ejemplo, validaré que la dirección contenga una calle y un número, como "Calle 123"
    return typeof address === 'string' && /\w+\s+\d+/.test(address);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The address format is invalid';
  }
}

export function IsAddress(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAddressConstraint,
    });
  };
}
