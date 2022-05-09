import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { Model } from 'mongoose';

@Injectable()
export class FeedsService {
  constructor(@InjectModel('Card') private GetFeedModel: Model<CreateCard>) {}

  async aggregateFeed(): Promise<CreateCard[]> {
    const collection_length = await this.GetFeedModel.count();
    const feed = await this.GetFeedModel.aggregate([
      { $sample: { size: collection_length } },
    ]);
    return new Promise((resolve) => {
      resolve(feed);
    });
  }
}
