import { Model } from 'mongoose';
import { wishlist } from './../wishlist/interface/wishlist.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Wishlist') private wishlistModel: Model<wishlist>,
  ) {}

  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action returns all Matches');
    });
  }

  async findMatches(user1, user2): Promise<any> {
    const wishlist = await this.wishlistModel
      .find({
        // 'cardId.createdBy': user2,
        userId: user1,
        like: { $in: [true] },
        // 'cardId.createdBy': user2,
      })
      .populate('cardId');
    return new Promise((resolve) => {
      resolve(wishlist.filter((w: any) => w.cardId.createdBy + '' === user2));
    });
  }
}
