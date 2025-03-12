import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { returnProductObject } from '../product/returnProduct.object';
import { Order, OrderItem } from '@prisma/client';
import { OrderDto } from './dto/order.dto';


@Injectable()
export class OrderService {
  private readonly stripe: Stripe;

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'))
  }

  public async getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            // @ts-ignore
            product: {
              select: returnProductObject
            }
          }
        }
      }
    });
  }

  public async getByUserId(userId: string) {
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
            // @ts-ignore
            product: {
              select: returnProductObject
            }
          }
        }
      }
    });
  }

  public async placeOrder(dto: OrderDto, userId: string) {
    const total = dto.items.reduce((acc, current) => acc + current.price * current.count, 0);
    const minStripeSumAllowed = 0.5;

    if (total < minStripeSumAllowed) {
      throw new BadRequestException('Minimum order cost is $0.5 USD');
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
}
