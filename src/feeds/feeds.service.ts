import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
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
      } else if (Number.isInteger(parseInt(queries[q].split('-')[0]))) {
        if (queries[q] && queries[q].split('-').length > 1) {
          queries[q] = {
            $gte: queries[q].split('-')[0],
            $lte: queries[q].split('-')[1],
          };
        }
      } else if (q == 'location') {
        const latLong = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(queries['location'].split(',')[0]),
                parseFloat(queries['location'].split(',')[1]),
              ],
            },
            $minDistance: 0,
            $maxDistance: parseInt(queries['location'].split(',')[2]),
          },
        };
        queries[q] = latLong;
      } else {
        queries[q] = { $in: queries[q].split(',') };
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
