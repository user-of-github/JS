import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, CategoryService]
})
export class ProductModule {}
