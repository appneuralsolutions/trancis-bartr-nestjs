import { Match } from './interface/match.interface';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { CreateMatchDto } from './dto/create-match.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PushNotificationService } from 'src/push_notification/push_notification.service';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Match') private matchModel: Model<Match>,
    @InjectModel('Card') private cardModel: Model<CreateCard>,
    private readonly pushnotificationService: PushNotificationService,
  ) {}

  async create(
    data: CreateMatchDto,
    userPayload,
    pushnotificationDto: any,
    messagingPayload: MessagingPayload,
  ): Promise<Match> {
    const card = await this.cardModel
      .findOne({ _id: data.cardId })
      .populate([{ path: 'createdBy' }]);
    let match;
    if (card) {
      match = await this.matchModel.findOne({
        cardId: data.cardId,
        userId: userPayload.userId,
      });
      if (!match) {
        match = await new this.matchModel({
          ...data,
          userId: userPayload.userId,
        }).save();
      }
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

  async findMatches(user1, user2, messagingPayload): Promise<any> {
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
        this.pushnotificationService.send(
          {
            fcmToken: null,
            //'c3E2ZYvxQB6Zdb0KKhSBoH:APA91bEhRQhDnPj_bBVOAMQLksvW7MT5Aqb4vg4WghCwxe8sW8rVMMLkxZkQDuzHMpaAieyvMEGOfBEK0b5ygWDqUzIn2ga6IgYhmS_92n6ofrErsA8Bn-Y-uakv3Eu7_OSGcHCtd2z6',
            title: 'Match Request',
            body: 'your request is accepted',
            userId: user2,
          },
          messagingPayload,
        );
        resolve(true);
      } else {
        this.pushnotificationService.send(
          {
            fcmToken: null,
            //'c3E2ZYvxQB6Zdb0KKhSBoH:APA91bEhRQhDnPj_bBVOAMQLksvW7MT5Aqb4vg4WghCwxe8sW8rVMMLkxZkQDuzHMpaAieyvMEGOfBEK0b5ygWDqUzIn2ga6IgYhmS_92n6ofrErsA8Bn-Y-uakv3Eu7_OSGcHCtd2z6',
            title: 'Match Request',
            body: 'you have received request for a match',
            userId: user2,
          },
          messagingPayload,
        );
        resolve(false);
      }
    });
  }

  async findInterestShown(userId): Promise<any> {
    const matches = await this.matchModel.find({ userId }).populate('cardId');
    // match1 = match1.filter((w: any) => w.cardId.createdBy + '' === user2);

    // let match2 = await this.matchModel
    //   .find({
    //     // 'cardId.createdBy': user2,
    //     userId: user2,
    //     rightSwiped: { $in: [true] },
    //     // 'cardId.createdBy': user1,
    //   })
    //   .populate('cardId');

    // match2 = match2.filter((w: any) => w.cardId.createdBy + '' === user1);
    return new Promise((resolve) => {
      resolve(matches);
    });
  }
}
