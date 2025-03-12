import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../auth/user.decorator';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  public constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  public async getAll() {
    return await this.orderService.getAll();
  }

  @Get('by-user')
  @Auth()
  public async getByUser(@CurrentUser('id') userId: string) {
    return this.orderService.getByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth()
  public async createOrder(
    @Body() orderDto: OrderDto,
    @CurrentUser('id') userId: string
  ) {
    return this.orderService.placeOrder(orderDto, userId);
  }
}
