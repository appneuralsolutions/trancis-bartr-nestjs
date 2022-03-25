import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './@dtos/create-user.dto';
import { UpdateUserDto } from './@dtos/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action adds a new user');
    });
  }

  async findAll(createUserDto: CreateUserDto): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns all users`);
    });
  }
  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} user`);
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} user`);
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action removes a #${id} user`);
    });
  }
}
