import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './@dtos/create-card.dto';
import { CreateCard } from './@interface/card.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UpdateCardDto } from './@dtos/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel('card') private cardModel: Model<CreateCard>) {}

  async create(data: CreateCardDto, userPayload): Promise<CreateCard> {
    const cardTitle = await this.cardModel
      .findOne({
        title: data.title,
      })
      .exec();
    if (!cardTitle) {
      data.createdBy = userPayload.userId;
      const createdData = await new this.cardModel(data).save();
      console.log(createdData);
      return new Promise((resolve) => {
        resolve(createdData);
      });
    } else {
      throw 'Card already present';
    }
  }

  async findAll(): Promise<CreateCard[]> {
    const card = await this.cardModel.find();
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findByProfile(userPayload): Promise<CreateCard[]> {
    const email = userPayload.email;
    const card = await this.cardModel.find({ email });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findOne(_id: string): Promise<CreateCard> {
    const card = await this.cardModel.findOne({ _id });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async uploadImages(
    _id: string,
    data: CreateCardDto,
    files,
  ): Promise<CreateCard> {
    const images = [];
    files.forEach((file: any) => {
      images.push(file.path.replace('uploads', ''));
    });
    // const photoUrl = '/card/' + file.filename;
    data.images = images;
    const card = await this.cardModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async update(_id: string, data: CreateCardDto): Promise<CreateCard> {
    const card = await this.cardModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async remove(_id: string): Promise<CreateCard> {
    const card = await this.cardModel
      .findOneAndDelete({
        _id,
      })
      .exec();
    return new Promise((resolve) => {
      resolve(card);
    });
  }
}
