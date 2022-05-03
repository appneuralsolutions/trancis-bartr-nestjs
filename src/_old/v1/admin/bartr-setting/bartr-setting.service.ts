import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBartrSignupReward } from './interfaces/bartrSignupRewardInterface';
import { Model } from 'mongoose';
import { IBartrPointValue } from './interfaces/bartrPointValueInterface';

@Injectable()
export class BartrSettingService {

    constructor( @InjectModel('bartrSignupReward') private readonly bartrSignupRewardModel: Model<IBartrSignupReward>,
    @InjectModel('bartrPointValue') private readonly bartrPointValueModel: Model<IBartrPointValue>
    ){

    }

    async createBartrSignupReward(BartrSignupRewardDTO: any) {
        const bartrRewardPoints = await new this.bartrSignupRewardModel(BartrSignupRewardDTO).save();
        console.log(bartrRewardPoints)
        return bartrRewardPoints;
      }

    async getBartrSignupRewardValue(){
        return await this.bartrSignupRewardModel.find();
      }


      async createBartrPoint(BartrPointValueDTO) {
        const bartrRewardPoints = await new this.bartrPointValueModel(BartrPointValueDTO).save();
        console.log(bartrRewardPoints)
        return bartrRewardPoints;
      }

    async getBartrPointValue(){
        return await this.bartrPointValueModel.find();
      }

}
