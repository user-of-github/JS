import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Auth } from '../auth/auth.decorator';

@Controller('products')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  public async getAll(@Query('searchTerm') searchTerm?: string) {
    return await this.productService.getAll(searchTerm);
  }

  @Get('by-id/:id')
  public async getById(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  
  @Get('by-slug/:slug')
  public async getBySlug(@Param('slug') slug: string) {
    return await this.productService.getBySlug(slug);
  }

  @Get('by-category/:categorySlug')
  public async getByCategory(@Param('categorySlug') categorySlug: string) {
    return await this.productService.getByCategory(categorySlug);
  }

  @HttpCode(200)
  @Post()
  public async create() {
    return await this.productService.create();
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  public async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return await this.productService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  public async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
