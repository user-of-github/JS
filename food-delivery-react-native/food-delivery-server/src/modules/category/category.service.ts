import { Injectable, NotFoundException } from '@nestjs/common';
import slug from 'slug';
import { PrismaService } from '../prisma/prisma.service';
import { returnCategoryObject } from './returnCategory.object';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    public constructor(
        private readonly prismaService: PrismaService
    ) {}

    public async getAll() {
        return this.prismaService.category.findMany({
            select: returnCategoryObject
        });
    }

    public async getById(id: string) {
        const category = await this.prismaService.category.findUnique({
            where: {
                id
            },
            select: returnCategoryObject
        });

        if (!category) {
            return new NotFoundException('Category not found');
        }

        return category;
    }

    public async getBySlug(slug: string) {
        const category = await this.prismaService.category.findUnique({
            where: {
                slug
            },
            select: returnCategoryObject
        });

        if (!category) {
            return new NotFoundException('Category not found');
        }

        return category;
    }


    public async create() {
        return await this.prismaService.category.create({
            data: {
                name: '', 
                slug: '',
                image: ''
            }
        });
    }

    public async update(id: string, dto: CategoryDto) {
        return await this.prismaService.category.update({
            where: {
                id
            },
            data: {
                name: dto.name, 
                slug: slug(dto.name),
                image: dto.image
            }
        });
    }

    public async delete(id: string) {
        return await this.prismaService.category.delete({
            where: {
                id
            }
        });
    }
}
