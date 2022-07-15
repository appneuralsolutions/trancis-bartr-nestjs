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
      if (q !== 'value') {
        queries[q] = { $in: queries[q].split(',') };
      }
    });

    if (queries.value && queries.value.split(',').length > 1) {
      queries['value'] = {
        $gte: queries.value.split(',')[0],
        $lte: queries.value.split(',')[1],
      };
    }

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
