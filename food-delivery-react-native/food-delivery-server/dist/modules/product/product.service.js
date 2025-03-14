"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slug_1 = require("slug");
const returnProduct_object_1 = require("./returnProduct.object");
const category_service_1 = require("../category/category.service");
let ProductService = class ProductService {
    constructor(prismaService, categoryService) {
        this.prismaService = prismaService;
        this.categoryService = categoryService;
    }
    async getAll(searchString, limit) {
        if (searchString) {
            const results = await this.search(searchString);
            console.log(searchString, results.map((r) => r.name));
            return results;
        }
        return this.prismaService.product.findMany({
            select: returnProduct_object_1.returnProductObject,
            orderBy: {
                createdAt: 'desc'
            },
            take: limit
        });
    }
    async search(searchString) {
        return await this.prismaService.product.findMany({
            where: {
                name: {
                    contains: searchString,
                    mode: 'insensitive'
                }
            },
            select: returnProduct_object_1.returnProductObject
        });
    }
    async getById(id) {
        const product = await this.prismaService.product.findUnique({
            where: {
                id
            },
            select: returnProduct_object_1.returnProductObject
        });
        if (!product) {
            return new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async getBySlug(slug) {
        const product = await this.prismaService.product.findUnique({
            where: {
                slug
            },
            select: returnProduct_object_1.returnProductObject
        });
        if (!product) {
            return new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async getByCategory(categorySlug) {
        const products = await this.prismaService.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: returnProduct_object_1.returnProductObject
        });
        if (!products) {
            return new common_1.NotFoundException('Products not found');
        }
        return products;
    }
    async getAllGrouppedByCategory() {
        const categories = await this.prismaService.category.findMany({
            include: {
                products: true
            }
        });
        return categories;
    }
    async create() {
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
    async update(id, dto) {
        await this.categoryService.getById(dto.categoryId);
        return await this.prismaService.product.update({
            where: {
                id
            },
            data: {
                name: dto.name,
                slug: (0, slug_1.default)(dto.name),
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
    async delete(id) {
        return await this.prismaService.product.delete({
            where: {
                id
            }
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        category_service_1.CategoryService])
], ProductService);
//# sourceMappingURL=product.service.js.map