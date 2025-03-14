import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: string): Promise<{
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
    toggleFavourite(id: string, productId: string): Promise<{
        message: string;
    }>;
}
