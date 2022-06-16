import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { wishlist } from './interface/wishlist.interface';
import { Model } from 'mongoose';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
// // import { UpdateWishlistDto } from './dto/update-wishlist.dto';
// import { Card } from './../../cards/@entities/card.entity';
// import { UpdateCardDto } from './../../cards/@dtos/update-card.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('Wishlist') private WishlistModel: Model<wishlist>,
    @InjectModel('Card') private cardModel: Model<CreateCard>,
  ) {}

  async create(data: CreateWishlistDto, userPayload): Promise<wishlist> {
    let wishlist = await this.WishlistModel.findOne({ cardId: data.cardId });
    if (!wishlist) {
      wishlist = await new this.WishlistModel({
        ...data,
        userId: userPayload.userId,
      }).save();
    } else {
      wishlist.like = data.like;
      await wishlist.save();
    }
    // const card = await this.cardModel.findOne({ _id: data.cardId });

    // if (card) {
    //   const likes = card.likes + 1;
    //   await this.cardModel.findOneAndUpdate(
    //     { _id: data.cardId },
    //     { $set: { likes: likes } },
    //     {
    //       new: true,
    //     },
    //   );
    // } else {
    //   // throw ErrorMessage.NOT_SUCCESSFULLY_FIND_CARD;
    // }
    return new Promise((resolve) => {
      resolve(wishlist);
    });
  }

  async findAll(userPayload): Promise<any> {
    const userId = userPayload.userId;
    let wishlist = await this.WishlistModel.find({
      userId,
      like: { $in: [true, false] },
    }).populate('cardId');

    const likeWishlist = await this.WishlistModel.find({ userId, like: true });

    const dislikeWishlist = await this.WishlistModel.find({
      userId,
      like: false,
    });

    wishlist = wishlist.map((w: any) => {
      const cardId = { ...{ ...w._doc }.cardId._doc };
      const isLiked = { ...w._doc }.like;
      cardId['isLiked'] = isLiked;
      return cardId;
    });

    return new Promise((resolve) => {
      resolve(wishlist);
    });
  }

  async findOne(id: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} wishlist`);
    });
  }

  async update(
    _id: string,
    userPayload,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<any> {
    const userId = userPayload.userId;
    const wishlist = await this.WishlistModel.findOneAndDelete(
      { _id, userId },
      {
        updateWishlistDto,
      },
    );
    return new Promise((resolve) => {
      resolve(wishlist);
    });
  }

  async remove(id: string): Promise<wishlist> {
    const wishlist = await this.WishlistModel.findOneAndDelete({
      _id: id,
    }).exec();
    return new Promise((resolve) => {
      resolve(wishlist);
    });
  }
}
