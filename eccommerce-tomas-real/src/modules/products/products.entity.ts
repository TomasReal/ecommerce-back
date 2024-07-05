/* import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { OrderDetail } from '../ordersDetails/ordersDetails.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  stock: boolean;

  @Column({ type: 'text', default: 'default-img-url.jpg' })
  imgUrl: string;

  @OneToOne(() => Category, (category) => category.prodcut)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail?: OrderDetail[];
}
 */

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { OrderDetail } from '../ordersDetails/ordersDetails.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'boolean', nullable: false })
  stock: boolean;

  @Column({ type: 'text', default: 'default-img-url.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail?: OrderDetail[];
}
