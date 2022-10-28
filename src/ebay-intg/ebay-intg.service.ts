import { Injectable } from '@nestjs/common';
import { EbayDto } from './dto/ebay-intg.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ebay } from './interface/ebay-intg.interface';

@Injectable()
export class EbayIntgService {
    constructor(@InjectModel('Ebay') private readonly ebayModel: Model<Ebay>){}

    async create(data: EbayDto): Promise<Ebay> {
        const createdData = await new this.ebayModel(data).save();
        return new Promise((resolve) => {
          resolve(createdData);
        });
      }
      async findAll(): Promise<Ebay[]> {
        const feedback = await this.ebayModel.find();
        return new Promise((resolve) => {
          resolve(feedback);
        });
      }
}
