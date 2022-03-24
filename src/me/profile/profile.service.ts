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

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
