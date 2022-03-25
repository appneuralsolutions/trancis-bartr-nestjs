import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './@dto/create-preference.dto';
import { UpdatePreferenceDto } from './@dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  async create(createPreferenceDto: CreatePreferenceDto): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action adds a new preference');
    });
  }

  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns all preferences`);
    });
  }

  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} preference`);
    });
  }

  async update(
    id: number,
    updatePreferenceDto: UpdatePreferenceDto
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} preference`);
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action removes a #${id} preference`);
    });
  }

}
