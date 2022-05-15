import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCard } from '../cards/@interface/card.interface';

@Injectable()
export class FeedsService {
  constructor(@InjectModel('Card') private feedModel: Model<CreateCard>) {}

  async aggregateFeed(): Promise<CreateCard[]> {
    const collection_length = await this.feedModel.count();
    const feed = await this.feedModel.aggregate([
      { $sample: { size: collection_length } },
    ]);
    return new Promise((resolve) => {
      resolve(feed);
    });
  }
}
