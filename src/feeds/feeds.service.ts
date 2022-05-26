import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCard } from '../cards/@interface/card.interface';

@Injectable()
export class FeedsService {
  constructor(@InjectModel('Card') private feedModel: Model<CreateCard>) {}

  async aggregateFeed(categories?): Promise<CreateCard[]> {
    // const collection_length = await this.feedModel.count();
    if (categories) {
      const feeds = await this.feedModel
        .find({ categoryId: { $in: categories.split(',') } })
        .sort({ _id: -1 });
      return new Promise((resolve) => {
        resolve(feeds);
      });
    } else {
      const feeds = await this.feedModel.find({}).sort({ _id: -1 });
      return new Promise((resolve) => {
        resolve(feeds);
      });
    }
  }
}
