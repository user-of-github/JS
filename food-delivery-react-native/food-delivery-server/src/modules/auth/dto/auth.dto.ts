import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsString()
    @IsEmail()
    public readonly email: string;


    @MinLength(6, {
        message: 'Password must be at least 6 symbols long'
    })
    @IsString()
    public readonly password: string;
}