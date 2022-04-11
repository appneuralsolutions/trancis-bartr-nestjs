import { Preference } from './@entities/preference.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePreferenceDto } from './@dto/create-preference.dto';
import { PreferencesCard } from './@interface/preferences.interface';
import { Model } from 'mongoose';
// import { UpdatePreferenceDto } from './@dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('Perference') private PreferenceModel: Model<PreferencesCard>,
  ) {}
  
  async create(data: CreatePreferenceDto): Promise<PreferencesCard> {
    const Preference = await new this.PreferenceModel(data).save();
    return new Promise((resolve) => {
      resolve(Preference);
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

  async update(id: number): Promise<string> {
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
