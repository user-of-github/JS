import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import slug from 'slug';
import { returnProductObject } from './returnProduct.object';
import { ProductDto } from './dto/product.dto';
import { CategoryService } from '../category/category.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService
  ) {}

  public async getAll(
    searchString?: string,
    limit?: number | undefined
  ): Promise<Product[]> {
    if (searchString) {
      const results = await this.search(searchString);
      console.log(
        searchString,
        results.map((r) => r.name)
      );
      return results;
    }

    return this.prismaService.product.findMany({
      select: returnProductObject,
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    });
  }

  public async search(searchString: string) {
    return await this.prismaService.product.findMany({
      where: {
        name: {
          contains: searchString,
          mode: 'insensitive'
        }
      },
      select: returnProductObject
    });
  }

  public async getById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id
      },
      select: returnProductObject
    });

    if (!product) {
      return new NotFoundException('Product not found');
    }

    return product;
  }

  public async getBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        slug
      },
      select: returnProductObject
    });

    if (!product) {
      return new NotFoundException('Product not found');
    }

    return product;
  }

  public async getByCategory(categorySlug: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: returnProductObject
    });

    if (!products) {
      return new NotFoundException('Products not found');
    }

    return products;
  }

  public async getAllGrouppedByCategory() {
    const categories = await this.prismaService.category.findMany({
      include: {
        products: true // Include all products in each category
      }
    });

    return categories;
  }

  public async create() {
    return await this.prismaService.product.create({
      data: {
        name: '',
        slug: '',
        image: '',
        price: 0,
        description: ''
      }
    });
  }

  public async update(id: string, dto: ProductDto) {
    await this.categoryService.getById(dto.categoryId); // if not exists ==> throw

    return await this.prismaService.product.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        slug: slug(dto.name),
        image: dto.image,
        price: dto.price,
        description: dto.description,
        category: {
          connect: {
            id: dto.categoryId
          }
        }
      }
    });
  }

  public async delete(id: string) {
    return await this.prismaService.product.delete({
      where: {
        id
      }
    });
  }
}
