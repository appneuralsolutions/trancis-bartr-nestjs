import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './@dtos/create-card.dto';
import { UpdateCardDto } from './@dtos/update-card.dto';

@Injectable()
export class CardsService {
  async create(createCardDto: CreateCardDto): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action adds a new card');
    });
  }

  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns all cards`);
    });
  }

  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} card`);
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} card`);
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action removes a #${id} card`);
    });
  }
}
