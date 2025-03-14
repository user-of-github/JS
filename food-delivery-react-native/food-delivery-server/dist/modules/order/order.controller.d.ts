import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        total: number;
    }[]>;
    getByUser(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                user: {
                    email: string;
                    password: string;
                    name: string;
                    phone: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    avatarPath: string;
                };
                category: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    slug: string;
                    image: string;
                };
                id: string;
                createdAt: Date;
                updatedAt: Date;
                _count: {
                    category: number;
                    user: number;
                    orderItems: number;
                };
                slug: string;
                image: string;
                description: string;
                price: number;
                categoryId: string;
                userId: string;
                orderItems: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    count: number;
                    productId: string | null;
                    orderId: string | null;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            count: number;
            productId: string | null;
            orderId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        total: number;
    })[]>;
    createOrder(orderDto: OrderDto, userId: string): Promise<{
        clientSecret: string;
    }>;
}
