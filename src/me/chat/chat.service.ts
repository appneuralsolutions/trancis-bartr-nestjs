import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interface/chat.interface';
import { CreateChatDto } from './dto/chat.dto';
import { CreateRoomDto } from './dto/chat-room.dto';
import { ICounter } from './interface/counter.interface';
import { CreateCounterDto } from './dto/counter.dto';
import { ChatRoom } from './interface/chatRoom.interface';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { PushNotificationService } from 'src/push_notification/push_notification.service';
import { PushNotificationDTO } from 'src/push_notification/dto/push_notification.dto';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import { IDeal } from './interface/deal.interface';
import { Message } from '../../shared/@constants/messages.constant';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('ChatRoom') private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel('Counter') private readonly counterModel: Model<ICounter>,
    @InjectModel('Deal') private readonly dealModel: Model<IDeal>,
    @InjectModel('Deducted-Amount')
    private readonly deductedAmountModel: Model<any>,
    private readonly pushnotificationService: PushNotificationService,
  ) {}

  async createRoom(data: CreateRoomDto): Promise<ChatRoom> {
    let getRoom: any = await this.chatRoomModel.findOne({
      users: { $all: [data.userId1, data.userId2] },
      // cardId: data.cardId,
    });
    if (!getRoom) {
      const createdData = await new this.chatRoomModel({
        users: [data.userId1, data.userId2],
        cardId: [data.cardId],
      }).save();
      return new Promise((resolve) => {
        resolve(createdData);
      });
    } else {
      if (!getRoom.cardId.includes(data.cardId)) {
        await this.chatRoomModel.findOneAndUpdate(
          {
            users: { $all: [data.userId1, data.userId2] },
          },
          {
            $push: { cardId: data.cardId },
          },
        );
        getRoom = await this.chatRoomModel.findOne({
          users: { $all: [data.userId1, data.userId2] },
          // cardId: data.cardId,
        });
      }
      return new Promise((resolve) => {
        resolve(getRoom);
      });
      throw ErrorMessage.ROOM_ALREADY_EXISTS;
    }
  }

  async getRooms(byUsers: string, cUser: string): Promise<ChatRoom[]> {
    let query;
    if (byUsers.includes(',')) {
      query = {
        users: {
          $in: [byUsers.split(',')[0].trim(), byUsers.split(',')[1].trim()],
        },
      };
    } else if (!byUsers.includes(',')) {
      query = {
        users: {
          $in: [cUser.trim()],
        },
      };
    } else {
      query = {};
    }
    const getRooms: any = await this.chatRoomModel
      .find(query)
      .populate(['users', 'chats'])
      .sort({ updatedAt: -1 });
    return new Promise((resolve) => {
      resolve(
        getRooms.map((r) => {
          const s = { ...r._doc };
          const user = r.users.filter((e) => e._id + '' !== cUser)[0];
          s.name = user.firstName + ' ' + user.lastName;
          return s;
        }),
      );
    });
  }

  async getChats(roomId: string, userId?, cardId?): Promise<any> {
    const getRoomChats = await this.chatRoomModel
      .findOne({ _id: roomId })
      .populate([
        { path: 'chats', populate: [{ path: 'counter' }, { path: 'cardId' }] },
      ]);
    return new Promise((resolve) => {
      resolve(getRoomChats);
    });
  }

  async getChatsByCardId(roomId: string, userId?, cardId?): Promise<any> {
    const getRoomChats = await this.chatModel
      .findOne({ _id: roomId, cardId: cardId })
      .populate([
        { path: 'chats', populate: [{ path: 'counter' }, { path: 'cardId' }] },
      ]);
    return new Promise((resolve) => {
      resolve(getRoomChats);
    });
  }

  async getAllCardChatsInARoom(roomId: string, userId?): Promise<any> {
    let cardsInARoom: any = await this.getCardsInARoom(roomId, userId);
    if (cardsInARoom && cardsInARoom.length > 0) {
      cardsInARoom = cardsInARoom.map(async (c) => {
        const getRoomChats = await this.chatRoomModel
          .findOne({ _id: roomId, cardId: c })
          .populate({ path: 'chats', populate: { path: 'counter' } });
        return getRoomChats;
      });
    }

    return new Promise((resolve) => {
      resolve(cardsInARoom);
    });
  }

  async getCardsInARoom(roomId: string, userId: string) {
    const cardsInARoom = await this.chatModel
      .find({ _id: roomId, sendBy: userId })
      .distinct('cardId');
    return new Promise((resolve) => {
      resolve(cardsInARoom);
    });
  }

  async createChat(
    roomId: string,
    data: CreateChatDto,
    messagingPayload: MessagingPayload,
  ): Promise<ChatRoom> {
    // data.createdBy = userPayload.userId;
    const d: any = data;
    d.roomId = roomId;
    const createdData: any = await new this.chatModel(d).save();
    const pushData: any = { chats: createdData._id };
    const chat = await this.chatRoomModel.findByIdAndUpdate(
      { _id: roomId },
      { $push: pushData },
    );
    return new Promise((resolve) => {
      resolve(chat);
    });
  }

  async findRoomById(_id): Promise<ChatRoom> {
    const data = await this.chatRoomModel.findOne({ _id });
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async findRoomByUsers(users: [string, string]): Promise<ChatRoom> {
    const userId1 = users[0];
    const userId2 = users[1];
    const data = await this.chatRoomModel.findOne({
      users: { $in: [userId1, userId2] },
    });
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async findMy(id): Promise<Chat[]> {
    //const me = userPayload.userId;
    const data = await this.chatModel.find({ _id: id });
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async findAll(uuid): Promise<Chat[]> {
    //const me = userPayload.userId;
    const data = await this.chatModel.find({ uuid: uuid });
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async update(id: string, data: CreateChatDto): Promise<Chat> {
    const feedback = await this.chatModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(feedback);
    });
  }

  async createCounter(
    roomId: string,
    data: CreateCounterDto,
    messagingPayload: MessagingPayload,
  ): Promise<any> {
    const counter = await new this.counterModel({
      cardId: data.cardId,
      amount: data.amount,
    }).save();
    const chat = {
      roomId: roomId,
      cardId: data.cardId,
      message: null,
      sentTo: data.sentTo,
      sentBy: data.sentBy,
      counter: counter._id,
      amount: data.amount,
    };

    const createdData = await new this.chatModel(chat).save();
    const pushData: any = { chats: createdData._id };
    const chatRoom = await this.chatRoomModel.findByIdAndUpdate(
      { _id: roomId },
      { $push: pushData },
    );
    await this.pushnotificationService.send(
      {
        fcmToken: null,
        title: 'Offer',
        body: 'you got an new offer!',
        userId: data.sentTo,
      },
      messagingPayload,
    );

    return new Promise((resolve) => {
      resolve(counter);
    });
  }

  async acceptCounter(
    _id,
    cardId,
    pushnotificationDto: PushNotificationDTO,
    messagingPayload: MessagingPayload,
  ): Promise<ICounter> {
    if (await this.counterModel.findOne({ _id, cardId, isAccepted: null })) {
      // const room = await this.chatRoomModel.findOne({ _id: roomId });
      const counter = await this.counterModel.findOneAndUpdate(
        { _id, cardId, isAccepted: null },
        {
          isAccepted: true,
        },
      );
      await this.pushnotificationService.send(
        pushnotificationDto,
        messagingPayload,
      );
      return new Promise((resolve) => {
        resolve(counter);
      });
    } else {
      throw ErrorMessage.COUNTER_NOT_APPLICABLE;
    }
  }

  async rejectCounter(
    roomId,
    cardId,
    pushnotificationDto: PushNotificationDTO,
    messagingPayload: MessagingPayload,
  ): Promise<ICounter> {
    if (await this.counterModel.findOne({ roomId, cardId, isAccepted: null })) {
      const counter = await new this.counterModel({
        roomId: roomId,
        cardId: cardId,
        isAccepted: false,
        isDealClosed: null,
        isCompleteDealClosed: null,
      });
      await this.pushnotificationService.send(
        pushnotificationDto,
        messagingPayload,
      );
      return new Promise((resolve) => {
        resolve(counter);
      });
    } else {
      throw ErrorMessage.COUNTER_NOT_APPLICABLE;
    }
  }

  async dealClose(
    roomId: string,
    cardId: string,
    pushnotificationDto: PushNotificationDTO,
    messagingPayload: MessagingPayload,
    isDealClosed: string,
    isCompleteDealClosed: string,
  ): Promise<any> {
    let room = await this.dealModel.findOneAndUpdate(
      { roomId, cardId },
      {
        $set: {
          isCompleteDealClosed: isCompleteDealClosed,
        },
      },
    );
    if (!room) {
      room = await new this.dealModel({
        roomId,
        cardId,
        isDealClosed,
      });
    }
    return new Promise((resolve) => {
      resolve(room);
    });
  }

  async getDealClose(
    roomId: string,
    cardId: string,
    pushnotificationDto: PushNotificationDTO,
    messagingPayload: MessagingPayload,
  ): Promise<any> {
    const room = await this.dealModel.findOneAndUpdate({ roomId, cardId });
    // let response = null;
    // if (room) {
    //   if (room.isDealClosed === true) {
    //     await this.pushnotificationService.send(
    //       pushnotificationDto,
    //       messagingPayload,
    //     );
    //     response = true;
    //   } else {
    //     await this.pushnotificationService.send(
    //       pushnotificationDto,
    //       messagingPayload,
    //     );
    //     response = false;
    //   }
    // } else {
    //   response = null;
    // }
    return new Promise((resolve) => {
      resolve(room);
    });
  }
}
