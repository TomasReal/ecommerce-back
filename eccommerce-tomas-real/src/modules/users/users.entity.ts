import { Order } from '../orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude() // Excluir la contraseña de la serialización
  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  order?: Order[];
}
