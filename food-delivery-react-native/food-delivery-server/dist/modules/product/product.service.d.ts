import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { CategoryService } from '../category/category.service';
import { Product } from '@prisma/client';
export declare class ProductService {
    private readonly prismaService;
    private readonly categoryService;
    constructor(prismaService: PrismaService, categoryService: CategoryService);
    getAll(searchString?: string, limit?: number | undefined): Promise<Product[]>;
    search(searchString: string): Promise<{
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
    getById(id: string): Promise<NotFoundException | {
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
    getBySlug(slug: string): Promise<NotFoundException | {
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
    getByCategory(categorySlug: string): Promise<NotFoundException | {
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
