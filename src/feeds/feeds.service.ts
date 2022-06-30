import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCard } from '../cards/@interface/card.interface';

@Injectable()
export class FeedsService {
  constructor(@InjectModel('Card') private feedModel: Model<CreateCard>) {}

  async aggregateFeed(type, value): Promise<CreateCard[]> {
    // const collection_length = await this.feedModel.count();
    if (type && value) {
      const feeds = await this.feedModel
        .find({ [type]: { $in: value.split(',') } })
        .sort({ _id: -1 })
        .populate([
          {
            path: 'categoryId',
            populate: {
              path: 'subjectId',
            },
          },
          {
            path: 'createdBy',
          },
        ]);
      return new Promise((resolve) => {
        resolve(feeds);
      });
    } else {
      const feeds = await this.feedModel
        .find({})
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
}
