import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { UpdateProfileDto } from './@dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor() {}
  async create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve('find all');
    });
  }

  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve('findOne');
    });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve('update');
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve('remove');
    });
  }
}
