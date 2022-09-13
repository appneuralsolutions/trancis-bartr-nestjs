import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { IUser } from 'src/auth/@interfaces/user.interface';
import { ChatService } from './chat.service';
import { Chat } from './interface/chat.interface';
import { ChatRoom } from './interface/chatRoom.interface';
import { ICounter } from './interface/counter.interface';

@WebSocketGateway(3001, { transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('ChatRoom') private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel('Counter') private readonly counterModel: Model<ICounter>,
    public chatService: ChatService,
  ) {}

  @SubscribeMessage('join-room') // <3>
  async enterChatRoom(
    client: Socket,
    data: { userId: string; roomId: string },
  ) {
    let user = await this.userModel.findOne({ _id: data.userId });
    client.join(data.roomId);
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { user: user._id, event: 'joined' }); // <3>
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() msgData: Chat) {
    console.log(msgData);
    // this.server.emit('message', msgData.message);
    // message.owner = await this.usersModel.findOne({ clientId: client.id });
    // message = await this.chatModel.create(msgData);
    // const msg = {
    //  roomId: msgData.roomId
    //   message: msgData.message,
    //   sentTo: msgData.sentTo,
    //   sentBy: msgData.sentBy,
    //   counter: msgData.counter,
    // };
    await this.chatService.createChat(msgData.roomId, msgData);
    this.server.in(msgData.roomId as string).emit('message', msgData.message);
  }
}
