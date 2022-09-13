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

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('ChatRoom') private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel('Counter') private readonly counterModel: Model<ICounter>,
  ) {}

  async createRoom(data: CreateRoomDto): Promise<ChatRoom> {
    const createdData = await new this.chatRoomModel({
      users: [data.userId1, data.userId2],
    }).save();
    return new Promise((resolve) => {
      resolve(createdData);
    });
  }

  async getRooms(byUsers): Promise<ChatRoom[]> {
    let query;
    if (byUsers) {
      query = {
        users: { $in: [byUsers.split(',')[0], byUsers.split(',')[1]] },
      };
    } else {
      query = {};
    }
    const getRooms = await this.chatRoomModel.find(query);
    return new Promise((resolve) => {
      resolve(getRooms);
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
  ): Promise<ChatRoom> {
    const counter = await new this.counterModel({ amount: data.amount }).save();
    const createdData = await new this.chatModel(data).save();
    const pushData: any = { chats: createdData._id };
    const chatRoom = await this.chatRoomModel.findByIdAndUpdate(
      { _id: roomId },
      { $push: pushData },
    );

    return new Promise((resolve) => {
      resolve(chatRoom);
    });
  }

  async AcceptCounter(_id): Promise<ICounter> {
    if (await this.counterModel.findOne({ _id, isAccepted: null })) {
      const counter = await this.counterModel.findOneAndUpdate(
        { _id, isAccepted: null },
        {
          isAccepted: true,
        },
      );
      return new Promise((resolve) => {
        resolve(counter);
      });
    } else {
      throw ErrorMessage.COUNTER_NOT_APPLICABLE;
    }
  }

  async RejectCounter(_id): Promise<ICounter> {
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

  async DealClose(_id: string): Promise<ChatRoom> {
    const room = await this.chatRoomModel.findOneAndUpdate(
      { _id },
      { isDealClosed: true },
    );
    return new Promise((resolve) => {
      resolve(room);
    });
  }
}
