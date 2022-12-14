import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBartrSignupReward } from './interfaces/bartrSignupRewardInterface';
import { Model } from 'mongoose';
import { IBartrPointValue } from './interfaces/bartrPointValueInterface';
// import { BartrSignupRewardDTO } from './dtos/bartr-signup-reward.dto';

@Injectable()
export class BartrSettingService {
  constructor(
    @InjectModel('bartrSignupReward')
    private readonly bartrSignupRewardModel: Model<IBartrSignupReward>,
    @InjectModel('bartrPointValue')
    private readonly bartrPointValueModel: Model<IBartrPointValue>,
  ) {}

  async createBartrSignupReward(BartrSignupRewardDTO: any) {
    const bartrRewardPoints = await new this.bartrSignupRewardModel(
      BartrSignupRewardDTO,
    ).save();
    console.log(bartrRewardPoints);
    return bartrRewardPoints;
  }

  async getBartrSignupRewardValue() {
    return await this.bartrSignupRewardModel.findOne().sort({ _id: -1 });
  }

  async createBartrPoint(BartrPointValueDTO) {
    const bartrRewardPoints = await new this.bartrPointValueModel(
      BartrPointValueDTO,
    ).save();
    console.log(bartrRewardPoints);
    return bartrRewardPoints;
  }

  async getBartrPointValue() {
    return await this.bartrPointValueModel.findOne().sort({ _id: -1 });
  }

  updateSignupRewardValue(_id: string, BartrSignupRewardDTO) {
    try {
      return this.bartrSignupRewardModel.findByIdAndUpdate(
        { _id },
        BartrSignupRewardDTO,
        { new: true },
      );
    } catch (error) {
      return error;
    }
  }

  updateBartrPointValue(_id: string, BartrPointValueUpdateDTO) {
    try {
      return this.bartrPointValueModel.findByIdAndUpdate(
        { _id },
        BartrPointValueUpdateDTO,
        { new: true },
      );
    } catch (error) {
      return error;
    }
  }
}
