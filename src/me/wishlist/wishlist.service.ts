import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { wishlist } from './interface/wishlist.interface';
import { Model } from 'mongoose';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('wishlist') private WishlistModel: Model<wishlist>,
  ) {}
  async create(data: CreateWishlistDto, userPayload): Promise<wishlist> 
 {
   data.email = userPayload.email;
  const createdData = await new this.WishlistModel(data).save();
    return new Promise((resolve) => {
      resolve(createdData);
    });
  }

  async findAll(userPayload): Promise<wishlist[]> {
    const email = userPayload.email
    const wishlist = await this.WishlistModel.find({email:email});
    return new Promise((resolve) => {
      resolve(wishlist);
    });
  }

  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} wishlist`);
    });
  }

  async update(
    id: number,
    // updateWishlistDto: UpdateWishlistDto,
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} wishlist`);
    });
  }

  async remove(id: string): Promise<wishlist> {
    const wishlist = await this.WishlistModel.findOneAndDelete({ _id: id }).exec();
    return new Promise((resolve) => {
      resolve(wishlist);
    });
  }
}
