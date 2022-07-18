import { Match } from './interface/match.interface';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { CreateMatchDto } from './dto/create-match.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Match') private matchModel: Model<Match>,
    @InjectModel('Card') private cardModel: Model<CreateCard>,
  ) {}

  async create(data: CreateMatchDto, userPayload): Promise<Match> {
    const card = await this.cardModel.findOne({ _id: data.cardId });
    let match;
    if (card) {
      match = await this.matchModel.findOne({ cardId: data.cardId });
      if (!match) {
        match = await new this.matchModel({
          ...data,
          userId: userPayload.userId,
        }).save();
      } else {
        match.like = data.rightSwiped;
        await match.save();
      }

      if (data.rightSwiped) {
        card.likes++;
        card.liked = card.liked.filter(
          (x) => x + '' != userPayload.userId + '',
        );
        card.liked.push(userPayload.userId);
      } else {
        card.likes--;
        card.liked = card.liked.filter(
          (x) => x + '' != userPayload.userId + '',
        );
      }
      card.save();
    } else {
      // throw ErrorMessage.NOT_SUCCESSFULLY_FIND_CARD;
    }
    return new Promise((resolve) => {
      resolve(match);
    });
  }

  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action returns all Matches');
    });
  }

  async findMatches(user1, user2): Promise<any> {
    let match1 = await this.matchModel
      .find({
        // 'cardId.createdBy': user2,
        userId: user1,
        rightSwiped: { $in: [true] },
        // 'cardId.createdBy': user2,
      })
      .populate('cardId');
    match1 = match1.filter((w: any) => w.cardId.createdBy + '' === user2);

    let match2 = await this.matchModel
      .find({
        // 'cardId.createdBy': user2,
        userId: user2,
        rightSwiped: { $in: [true] },
        // 'cardId.createdBy': user1,
      })
      .populate('cardId');

    match2 = match2.filter((w: any) => w.cardId.createdBy + '' === user1);
    return new Promise((resolve) => {
      if (match1 && match1.length && match2 && match2.length) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
