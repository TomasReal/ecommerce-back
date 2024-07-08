import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';
import { Order } from './orders.entity';
import { OrderDetail } from '../ordersDetails/ordersDetails.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(Order)
    private readonly ordersRepositoryDB: Repository<Order>,
  ) {}

  async addOrder(userId: string, products: { id: string }[]): Promise<Order> {
    // Buscar usuario por id
    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const order = new Order();
    order.user = user;
    order.total = 0;
    order.orderDetail = [];

    for (const productData of products) {
      const product = await this.productsRepository.getProductById(
        productData.id,
      );
      if (!product || product.stock == false) {
        throw new NotFoundException(`Product does not exist or out of stock.`);
      }

      const orderDetail = new OrderDetail();
      orderDetail.order = order;
      orderDetail.product = product;
      orderDetail.price = product.price;

      order.orderDetail.push(orderDetail);

      order.total += product.price;

      product.stock = false;
      await this.productsRepository.updateProduct(product);
    }

    await this.ordersRepositoryDB.save(order);

    return this.ordersRepositoryDB.findOne({
      where: { id: order.id },
      relations: ['orderDetail'],
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.getOrder(id);
    if (!order) {
      throw new NotFoundException(`order does not exist`);
    }
    return order;
  }
}
