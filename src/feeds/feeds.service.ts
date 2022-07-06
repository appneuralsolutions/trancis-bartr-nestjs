import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCard } from '../cards/@interface/card.interface';

@Injectable()
export class FeedsService {
  constructor(@InjectModel('Card') private feedModel: Model<CreateCard>) {}

  async aggregateFeed(queries): Promise<CreateCard[]> {
    // const collection_length = await this.feedModel.count();
    Object.keys(queries).map((q) => {
      queries[q] = { $in: queries[q].split(',') };
    });

    // console.log(queries);
    const feeds = await this.feedModel
      .find(queries)
      .sort({ _id: -1 })
      .populate([
        {
          path: 'categoryId',
          populate: {
            path: 'subjectId',
          },
        },
        {
          path: 'liked',
        },
        {
          path: 'createdBy',
        },
      ]);
    return new Promise((resolve) => {
      resolve(feeds);
    });
  }
}
