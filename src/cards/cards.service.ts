import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './@dtos/create-card.dto';
import { UpdateCardDto } from './@dtos/update-card.dto';

@Injectable()
export class CardsService {
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
