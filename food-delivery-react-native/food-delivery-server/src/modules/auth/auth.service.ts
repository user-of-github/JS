import { BadRequestException, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}
    
    public async register(dto: AuthDto) {
        const oldUser = await this.prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (oldUser) {
            throw new BadRequestException('User already exists');
        }

        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                name: faker.person.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number(),
                password: await hash(dto.password)
            }
        });

        return user;
    }


    private async issueTokens(userId: string) {
        const data = { id: userId };

        const accessToken = this.jwtService.sign(data, {
            expiresIn: '1h'
        });

        const refreshToken = this.jwtService.sign(data, {
            expiresIn: '7d'
        });
        
        
        return { accessToken, refreshToken };
    }
}
