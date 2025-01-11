import { IsJWT, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @IsJWT()
    public readonly refreshToken: string;
}