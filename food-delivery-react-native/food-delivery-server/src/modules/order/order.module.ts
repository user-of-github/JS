import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, ConfigService],
})
export class OrderModule {}
