import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';


@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getAll() {
    return await this.categoryService.getAll();
  }

  @Get('by-id/:id')
  public async getById(@Param('id') id: string) {
    return await this.categoryService.getById(id);
  }

  
  @Get('by-slug/:slug')
  public async getBySlug(@Param('slug') slug: string) {
    return await this.categoryService.getBySlug(slug);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  public async create() {
    return await this.categoryService.create();
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
