import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly prismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    validate({ id }: Pick<User, 'id'>): Promise<{
        email: string;
        password: string;
        name: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
    }>;
}
export {};
