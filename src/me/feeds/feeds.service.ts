import { CreateWishlistDto } from './../wishlist/dto/create-wishlist.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { Model } from 'mongoose';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel('Card') private cardModel: Model<CreateCard>,
    @InjectModel('Wishlist') private wishlistModel: Model<CreateWishlistDto>,
  ) {}

  async aggregateFeed(userPayload, queries): Promise<CreateCard[]> {
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
      } else {
        queries[q] = { $in: queries[q].split(',') };
      }
    });

    let feeds;

    // console.log(queries);
    feeds = await this.cardModel
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

    const wishlist = await this.wishlistModel.find({
      userId: userPayload.userId,
    });

    feeds = feeds.map((card) => {
      console.log(card);
      const myWishlist = wishlist.filter(
        (w) => w.cardId + '' === card._id + '',
      );
      return {
        ...card._doc,
        isLiked: myWishlist.length > 0 ? myWishlist[0].like : null,
      };
    });
    // const collection_length = await this.cardModel.count();
    // const feed = await this.cardModel.aggregate([
    //   { $sample: { size: collection_length } },
    // ]);
    return new Promise((resolve) => {
      resolve(feeds.filter((f) => (f.createdBy._id + '') !== (userPayload.userId + '')));
    });
  }
}
