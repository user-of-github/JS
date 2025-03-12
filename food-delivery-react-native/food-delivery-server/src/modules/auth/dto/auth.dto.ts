import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @MinLength(6, { message: 'Password must be at least 6 symbols long' })
  @IsString()
  public readonly password: string;
}

export class RegisterDto {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @MinLength(5, { message: 'Password must be at least 5 symbols long' })
  @IsString()
  public readonly password: string;

  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @IsString()
  public readonly name: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  public readonly phone: string;
}
