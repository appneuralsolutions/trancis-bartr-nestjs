import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePreferenceDto } from './@dto/create-preference.dto';
import { PreferencesCard } from './@interface/preferences.interface';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { Model } from 'mongoose';
// import { UpdatePreferenceDto } from './@dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('Perference') private PreferenceModel: Model<PreferencesCard>,
    @InjectModel('Card') private cardModel: Model<CreateCard>,
  ) {}

  async create(data: CreatePreferenceDto): Promise<CreateCard[]> {
    const Preference = await new this.PreferenceModel(data).save();
    console.log(Preference.typeofCard);
    const typeofCard = Preference.typeofCard;
    const price = Preference.price;
    const value = Preference.value;
    const fetchPreference = await this.cardModel.find({
      $or: [
        { availableOf: typeofCard },
        { price: { $eq: price } },
        { value: { $eq: value } },
      ],
    });
    return new Promise((resolve) => {
      resolve(fetchPreference);
    });
  }

  /* async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns all preferences`);
    });
  }

  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} preference`);
    });
  }

  async update(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} preference`);
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action removes a #${id} preference`);
    });
  } */
}
