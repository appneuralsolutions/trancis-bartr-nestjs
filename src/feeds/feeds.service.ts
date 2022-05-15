import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCard } from '../cards/@interface/card.interface';

@Injectable()
export class FeedsService {
  constructor(@InjectModel('Card') private feedModel: Model<CreateCard>) {}

  async aggregateFeed(): Promise<CreateCard[]> {
    // const collection_length = await this.feedModel.count();
    const feeds = await this.feedModel.find({}).sort({ createdOn: -1 });
    return new Promise((resolve) => {
      resolve(feeds);
    });
  }
}
