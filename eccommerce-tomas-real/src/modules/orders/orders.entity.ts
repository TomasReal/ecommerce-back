import { OrderDetail } from '../ordersDetails/ordersDetails.entity';
import { User } from '../users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: 'date';

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
}
