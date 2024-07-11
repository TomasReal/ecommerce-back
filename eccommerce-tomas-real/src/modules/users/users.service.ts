import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './User.dto';
import { User } from './users.entity';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { Role } from './roles/roles.enum';

@ApiTags('users')
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
    console.log(this.usersRepository);
  }

  async getUsers() {
    const users = await this.usersRepository.getUsers();
    return users.map((user) => instanceToPlain(plainToInstance(User, user)));
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return instanceToPlain(plainToInstance(User, user));
  }

  async addUser(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    const savedUser = await this.usersRepository.addUser(newUser);
    return instanceToPlain(plainToInstance(User, savedUser));
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.getUserByEmailWithPassword(email);
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return instanceToPlain(plainToInstance(User, user));
    }
    return null;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }

    const updatedUser = { ...user, ...updateUserDto, id };

    const savedUser = await this.usersRepository.updateUser(updatedUser);
    return instanceToPlain(plainToInstance(User, savedUser));
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUser(id);

    return { message: 'User deleted successfully' };
  }
}
