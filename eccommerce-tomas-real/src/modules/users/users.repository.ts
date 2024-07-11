/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    console.log(this.usersRepository);
  }

  // Helper function to remove sensitive fields from a user object
  private removeSensitiveFields(user: User): Partial<User> {
    const { password, role, ...userWithoutSensitiveFields } = user;
    return userWithoutSensitiveFields;
  }

  async getUsers(): Promise<Partial<User>[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => this.removeSensitiveFields(user));
  }

  async getUserById(id: string): Promise<Partial<User> | null> {
    const foundUser = await this.usersRepository.findOne({ where: { id } });
    return foundUser ? this.removeSensitiveFields(foundUser) : null;
  }

  async addUser(user: User): Promise<User> {
    if (
      !user ||
      !user.name ||
      !user.email ||
      !user.password ||
      !user.address ||
      !user.phone
    ) {
      throw new BadRequestException('Missing required fields');
    }

    const newUser = this.usersRepository.create(user);
    console.log(newUser);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(updatedUser: Partial<User> & { id: string }): Promise<User> {
    if (!updatedUser.id) {
      throw new BadRequestException('User ID is required');
    }

    // Actualiza el usuario en la base de datos
    await this.usersRepository.update(updatedUser.id, updatedUser);
    // Devuelve el usuario actualizado
    const updatedUserEntity = await this.usersRepository.findOne({
      where: { id: updatedUser.id },
    });
    if (!updatedUserEntity) {
      throw new BadRequestException(`User with id ${updatedUser.id} not found`);
    }

    return updatedUserEntity;
  }

  async deleteUser(id: string): Promise<string> {
    await this.usersRepository.delete(id);
    return id;
  }

  async getUserByEmail(email: string): Promise<Partial<User> | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ? this.removeSensitiveFields(user) : undefined;
  }

  async getUserByEmailWithPassword(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}

export default User;
