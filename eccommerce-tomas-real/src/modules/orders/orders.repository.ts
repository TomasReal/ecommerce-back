import { Injectable } from '@nestjs/common';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async addOrder(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  async getOrder() {}
}
