import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { DoPasswordsMatchConstraint } from '../../libs/common/decorators/do-passwords-match-constraint.decorator';


export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(DoPasswordsMatchConstraint)
  passwordRepeat: string;
}