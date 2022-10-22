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
@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('ChatRoom') private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel('Counter') private readonly counterModel: Model<ICounter>,
    @InjectModel('Deducted-Amount') private readonly deductedAmountModel: Model<any>,
    private readonly pushnotificationService: PushNotificationService,
  ) { }

  async createRoom(data: CreateRoomDto): Promise<ChatRoom> {
    const getRoom: any = await this.chatRoomModel.findOne({
      users: { $all: [data.userId1, data.userId2] },
    });
    if (!getRoom) {
      const createdData = await new this.chatRoomModel({
        users: [data.userId1, data.userId2],
        cardId: data.cardId,
      }).save();
      return new Promise((resolve) => {
        resolve(createdData);
      });
    } else {
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
      .populate(['users', 'chats', 'cardId'])
      .sort({ updatedAt: -1 });
    return new Promise((resolve) => {
      resolve(
        getRooms.map((r) => {
          let s = { ...r._doc };
          const user = r.users.filter((e) => e._id + '' !== cUser)[0];
          s.name = user.firstName + ' ' + user.lastName;
          return s;
        }),
      );
    });
  }

  async getChats(roomId: string, userId?, cardId?): Promise<any> {
    const deductedAmount = userId && cardId ? await this.deductedAmountModel.findOne({
      user: userId,
      cardId: cardId,
    }): null;
    const getRoomChats = await this.chatRoomModel
      .findOne({ _id: roomId })
      .populate({ path: 'chats', populate: { path: 'counter' } });
    return new Promise((resolve) => {
      resolve(getRoomChats);
    });
  }

  async createChat(roomId: string, data: CreateChatDto): Promise<ChatRoom> {
    //data.createdBy = userPayload.userId;
    const createdData: any = await new this.chatModel(data).save();
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
  ): Promise<any> {
    const counter = await new this.counterModel({ amount: data.amount }).save();
    const chat = {
      roomId: roomId,
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

    return new Promise((resolve) => {
      resolve(counter);
    });
  }

  async acceptCounter(_id,pushnotificationDto: PushNotificationDTO): Promise<ICounter> {
    if (await this.counterModel.findOne({ _id, isAccepted: null })) {
      const counter = await this.counterModel.findOneAndUpdate(
        { _id, isAccepted: null },
        {
          isAccepted: true,
        },
      );
      if(counter.isAccepted === true){
        await this.pushnotificationService.send(pushnotificationDto)
      }
      return new Promise((resolve) => {
        resolve(counter);
      });
    } else {
      throw ErrorMessage.COUNTER_NOT_APPLICABLE;
    }
  }

  async rejectCounter(_id): Promise<ICounter> {
    if (await this.counterModel.findOne({ _id, isAccepted: null })) {
      const counter = await this.counterModel.findOneAndUpdate(
        { _id, isAccepted: null },
        {
          isAccepted: false,
        },
      );
      return new Promise((resolve) => {
        resolve(counter);
      });
    } else {
      throw ErrorMessage.COUNTER_NOT_APPLICABLE;
    }
  }

  async dealClose(_id: string,pushnotificationDto: PushNotificationDTO): Promise<ChatRoom> {
    const room = await this.chatRoomModel.findOneAndUpdate(
      { _id },
      { isDealClosed: true },
    );
    if(room.isDealClosed === true){
      await this.pushnotificationService.send(pushnotificationDto)
    }
    return new Promise((resolve) => {
      resolve(room);
    });
  }
}
