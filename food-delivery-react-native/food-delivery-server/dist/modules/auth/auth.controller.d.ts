import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    refreshTokens(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
        };
    }>;
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
        };
    }>;
}
