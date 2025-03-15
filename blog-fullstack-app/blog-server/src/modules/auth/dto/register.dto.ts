import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  public name: string;

}