import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { wishlist } from './interface/wishlist.interface';
import { Model } from 'mongoose';
import { CreateCard } from 'src/cards/@interface/card.interface';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Card } from './../../cards/@entities/card.entity';
import { UpdateCardDto } from './../../cards/@dtos/update-card.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('wishlist') private WishlistModel: Model<wishlist>,
    @InjectModel('Card') private GetCardModel: Model<CreateCard>,
  ) {}
  async create(data: CreateWishlistDto, userPayload): Promise<wishlist> 
 {
   data.email = userPayload.email;
   const Card = await this.GetCardModel.find({title: data.title})
   const like = Card[0].likes+1
   console.log(Card)
   if(Card){
  const createdData = await new this.WishlistModel(data).save();
  const Updatecard = await this.GetCardModel.findOneAndUpdate({title : data.title }, {$set: {likes: like}}, {
    new: true,
  });
  console.log(Updatecard)
    return new Promise((resolve) => {
      resolve(createdData);
    });
  }
  }

  async findAll(userPayload): Promise<any> {
    const email = userPayload.email
    var wishlist = await this.WishlistModel.find({email:email});
    for (let i=0 ;i<wishlist.length; i++){
      var getCard = await this.GetCardModel.findOne({title: wishlist[i].title})
    }
    return new Promise((resolve) => {
      resolve(getCard);
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
