import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interface/chat.interface';
import { CreateChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('Chat') private readonly chatModel: Model<Chat>,
      ) {}

      async create(data: CreateChatDto): Promise<Chat> {
        //data.createdBy = userPayload.userId;
        const createdData = await new this.chatModel(data).save();
        return new Promise((resolve) => {
          resolve(createdData);
        });
      }

      async findMy(id): Promise<Chat[]> {
        //const me = userPayload.userId;
        const data = await this.chatModel.find({  _id: id});
        return new Promise((resolve) => {
          resolve(data);
        });
      }

      async findAll(user): Promise<Chat[]> {
        //const me = userPayload.userId;
        const data = await this.chatModel.find({ user: user});
        return new Promise((resolve) => {
          resolve(data);
        });
      }
    
      async update(
        id: string,
        data: CreateChatDto,
      ): Promise<Chat> {
        const feedback = await this.chatModel.findOneAndUpdate(
          { _id: id},
          data,
          {
            new: true,
          },
        );
        return new Promise((resolve) => {
          resolve(feedback);
        });
      }
}
