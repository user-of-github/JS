import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    getById(id: string): Promise<import("@nestjs/common").NotFoundException | {
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
    getBySlug(slug: string): Promise<import("@nestjs/common").NotFoundException | {
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
