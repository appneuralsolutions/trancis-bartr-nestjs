import { ErrorMessage } from './../shared/@constants/error.constant';
import { CreateWishlistDto } from './../me/wishlist/dto/create-wishlist.dto';
import { wishlist } from './../me/wishlist/interface/wishlist.interface';
import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './@dtos/create-card.dto';
import { CreateCard } from './@interface/card.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UpdateCardDto } from './@dtos/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel('Card') private cardModel: Model<CreateCard>,
    @InjectModel('Wishlist') private wishlistModel: Model<CreateWishlistDto>,
  ) {}

  async create(data: CreateCardDto, userPayload): Promise<CreateCard> {
    const cardTitle = await this.cardModel
      .findOne({
        title: data.title,
      })
      .exec();
    if (!cardTitle) {
      data.createdBy = userPayload.userId;
      const userType = userPayload.userType;
      if (userType === 'Buyer') {
        throw ErrorMessage.UNAUTHORIZED_ACCESS;
      } else {
        const createdData = await new this.cardModel(data).save();
        console.log(createdData);
        return new Promise((resolve) => {
          resolve(createdData);
        });
      }
    } else {
      throw ErrorMessage.CARDS_ALREADY_EXISTS;
    }
  }

  async findAll(): Promise<CreateCard[]> {
    const card = await this.cardModel.find().populate([
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
      // {
      //   path: 'email',
      // },
    ]);
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findByProfile(userPayload): Promise<CreateCard[]> {
    let cards: any = await this.cardModel.find({
      createdBy: userPayload.userId,
    });
    const wishlist = await this.wishlistModel.find({
      userId: userPayload.userId,
    });

    cards = cards.map((card) => {
      console.log(card);
      const myWishlist = wishlist.filter(
        (w) => w.cardId + '' === card._id + '',
      );
      return {
        ...card._doc,
        isLiked: myWishlist.length > 0 ? myWishlist[0].like : null,
      };
    });
    return new Promise((resolve) => {
      resolve(cards);
    });
  }

  async findOne(_id: string): Promise<CreateCard> {
    const card = await this.cardModel.findOne({ _id }).populate([
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
      resolve(card);
    });
  }

  async uploadImages(
    _id: string,
    data: CreateCardDto,
    files,
  ): Promise<CreateCard> {
    const images = [];
    if (files && files.length > 0) {
      files.forEach((file: any) => {
        images.push(file.path.replace('uploads', '/data'));
      });
      data.images = images;
      const card = await this.cardModel.findOneAndUpdate({ _id }, data, {
        new: true,
      });
      return new Promise((resolve) => {
        resolve(card);
      });
    } else {
      throw ErrorMessage.UPLOAD_IMAGE;
    }
  }

  async update(
    _id: string,
    data: CreateCardDto,
    userPayload,
  ): Promise<CreateCard> {
    const userType = userPayload.userType;
    if (userType === 'Buyer') {
      throw ErrorMessage.UNAUTHORIZED_ACCESS;
    } else {
      const card = await this.cardModel.findOneAndUpdate(
        { _id },
        { $set: data },
        {
          new: true,
        },
      );
      return new Promise((resolve) => {
        resolve(card);
      });
    }
  }

  async remove(_id: string): Promise<CreateCard> {
    const card = await this.cardModel
      .findOneAndDelete({
        _id,
      })
      .exec();
    return new Promise((resolve) => {
      resolve(card);
    });
  }
}
