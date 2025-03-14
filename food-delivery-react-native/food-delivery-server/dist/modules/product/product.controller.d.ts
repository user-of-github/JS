import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(searchTerm?: string, limit?: number): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
        description: string;
        price: number;
        categoryId: string | null;
        userId: string | null;
    }[]>;
    getById(id: string): Promise<import("@nestjs/common").NotFoundException | {
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
    }>;
    getBySlug(slug: string): Promise<import("@nestjs/common").NotFoundException | {
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
    }>;
    getByCategory(categorySlug: string): Promise<import("@nestjs/common").NotFoundException | {
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
    }[]>;
    getAllGrouppedByCategory(): Promise<({
        products: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            image: string;
            description: string;
            price: number;
            categoryId: string | null;
            userId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
    })[]>;
    create(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
        description: string;
        price: number;
        categoryId: string | null;
        userId: string | null;
    }>;
    update(id: string, dto: ProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
        description: string;
        price: number;
        categoryId: string | null;
        userId: string | null;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
        description: string;
        price: number;
        categoryId: string | null;
        userId: string | null;
    }>;
}
