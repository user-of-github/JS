import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            products: number;
        };
        slug: string;
        image: string;
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
    }[]>;
    getById(id: string): Promise<NotFoundException | {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            products: number;
        };
        slug: string;
        image: string;
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
    }>;
    getBySlug(slug: string): Promise<NotFoundException | {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            products: number;
        };
        slug: string;
        image: string;
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
    }>;
    create(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
    }>;
    update(id: string, dto: CategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        image: string;
    }>;
}
