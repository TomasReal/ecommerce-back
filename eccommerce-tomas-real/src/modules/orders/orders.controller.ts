import { Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('new')
  async addOrder(@Param('id') id: string, products: { id: string }[]) {
    return this.ordersService.addOrder(id, products);
  }

  @Get(':id')
  async getOrder() {
    return this.ordersService.getOrder;
  }
}
