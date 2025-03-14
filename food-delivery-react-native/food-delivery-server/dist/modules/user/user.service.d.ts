import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getById(id: string, selectObject?: Prisma.UserSelect): Promise<{
        email: string;
        password: string;
        name: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        avatarPath: string;
        favourites: {
            name: string;
            category: {
                name: string;
            };
            id: string;
            slug: string;
            image: string;
            price: number;
        }[];
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            total: number;
        }[];
        _count: {
            favourites: number;
            orders: number;
        };
    }>;
    toggleFavourite(userId: string, productId: string): Promise<{
        message: string;
    }>;
}
