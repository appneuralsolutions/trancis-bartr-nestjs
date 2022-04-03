import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './@dtos/create-card.dto';
import { CreateCard } from './@interface/card.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UpdateCardDto } from './@dtos/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel('card') private CreateCardModel: Model<CreateCard>,
  ) {}

  async create(data: CreateCardDto, userpayload, file): Promise<CreateCard> {
    const createcard = new this.CreateCardModel(data);
    const photoUrl = '/card/' + file.filename;
    data.image = photoUrl;
    const email = userpayload.email;
    data.email = email;
    const res = createcard.save();
    if (!res) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return new Promise((resolve) => {
        resolve(res);
      });
    }
  }

  async findAll(): Promise<CreateCard[]> {
    const card = await this.CreateCardModel.find();
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findOne(id: string): Promise<CreateCard> {
    const card = await this.CreateCardModel.findOne({ id });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async update(_id: string, data: CreateCardDto): Promise<CreateCard> {
    const card = await this.CreateCardModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async remove(id: string): Promise<CreateCard> {
    return new Promise((resolve) => {
      const card = this.CreateCardModel.findOneAndDelete({ _id: id }).exec();
      resolve(card);
    });
  }
}
