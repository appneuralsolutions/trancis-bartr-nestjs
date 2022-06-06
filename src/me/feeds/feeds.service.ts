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

  async aggregateFeed(userPayload, categories): Promise<CreateCard[]> {
    if (categories) {
      const feeds = await this.cardModel
        .find({
          // createdBy: userPayload.userId,
          categoryId: { $in: categories.split(',') },
        })
        .sort({ _id: -1 })
        .populate({
          path: 'categoryId',
          populate: {
            path: 'subjectId',
          },
        });
      return new Promise((resolve) => {
        resolve(feeds.filter((f: any) => f.createdBy !== userPayload.userId));
      });
    } else {
      const feeds = await this.cardModel.find({}).sort({ _id: -1 });
      // .populate('categoryId');
      return new Promise((resolve) => {
        resolve(
          feeds.filter((f: any) => {
            console.log(f.createdBy + '', userPayload.userId);
            return f.createdBy + '' !== userPayload.userId;
          }),
        );
      });
    }

    let cards: any = await this.cardModel
      .find({
        createdBy: userPayload.userId,
        categoryId: { $in: categories.split(',') },
      })
      .sort({ _id: -1 });
    const wishlist = await this.wishlistModel.find({
      userId: userPayload.userId,
    });

    cards = cards.map((card) => {
      console.log(card);
      const myWishlist = wishlist.filter((w) => w.cardId === card._id + '');
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
      resolve(cards);
    });
  }
}
