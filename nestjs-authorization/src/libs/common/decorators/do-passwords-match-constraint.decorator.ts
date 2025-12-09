import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RegisterDto } from '../../../modules/auth/dto/register.dto';

@ValidatorConstraint({ name: 'DoPasswordsMatchConstraint', async: false })
export class DoPasswordsMatchConstraint implements ValidatorConstraintInterface {
  public validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const obj = validationArguments?.object as RegisterDto;
    return obj.password === obj.passwordRepeat;
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Passwords must be same';
  }
}
