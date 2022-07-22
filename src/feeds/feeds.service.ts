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
      if (
        (q !== 'value' && q !== 'year') ||
        ((q === 'value' || q === 'year') && !queries[q].includes('-'))
      ) {
        queries[q] = { $in: queries[q].split(',') };
      } else {
        if (queries[q] && queries[q].split('-').length > 1) {
          queries[q] = {
            $gte: queries[q].split('-')[0],
            $lte: queries[q].split('-')[1],
          };
        }
      }
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

  async getLocations(): Promise<string[]> {
    const locations = await this.feedModel.find({}).distinct('location');
    return new Promise((resolve) => {
      resolve(locations);
    });
  }
}
