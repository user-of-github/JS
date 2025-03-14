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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const returnProduct_object_1 = require("../product/returnProduct.object");
let OrderService = class OrderService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'));
    }
    async getAll() {
        return this.prismaService.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: returnProduct_object_1.returnProductObject
                        }
                    }
                }
            }
        });
    }
    async getByUserId(userId) {
        return this.prismaService.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userId
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: returnProduct_object_1.returnProductObject
                        }
                    }
                }
            }
        });
    }
    async placeOrder(dto, userId) {
        const total = dto.items.reduce((acc, current) => acc + current.price * current.count, 0);
        const minStripeSumAllowed = 0.5;
        if (total < minStripeSumAllowed) {
            throw new common_1.BadRequestException('Minimum order cost is $0.5 USD');
        }
        const order = await this.prismaService.order.create({
            data: {
                items: {
                    create: dto.items
                },
                total,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        const totalCents = Math.round(total * 100);
        const payment = await this.stripe.paymentIntents.create({
            amount: totalCents,
            currency: 'USD',
            automatic_payment_methods: {
                enabled: true
            },
            description: `Order by user ${userId} with cost $${totalCents} USD. ${new Date().toLocaleString()}`
        });
        return { clientSecret: payment.client_secret };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], OrderService);
//# sourceMappingURL=order.service.js.map