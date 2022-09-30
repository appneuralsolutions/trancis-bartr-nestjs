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
import { Server } from 'socket.io';

@WebSocketGateway(3001, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Card') private readonly cardModel: Model<IUser>,
    @InjectModel('ChatRoom') private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel('Counter') private readonly counterModel: Model<ICounter>,
    @InjectModel('Deducted-Amount') private readonly deductedAmountModel: Model<any>,
    public chatService: ChatService,
  ) { }

  @SubscribeMessage('join-room') // <3>
  async enterChatRoom(
    client: Socket,
    data: {
      userId: string;
      roomId: string;
      cardId: string;
      matchUserId: string;
    },
  ) {
    const user = await this.userModel.findOne({ _id: data.userId });
    const deductedAmount = await this.deductedAmountModel.findOne({
      user: data.userId,
      cardId: data.cardId,
    });
    client.join(data.roomId);
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { user: user._id, event: 'joined' }); // <3>
    this.server.to(client.id as string).emit('messages', {
      cardDetails: this.cardModel.findOne({ _id: data.cardId }),
      isDeductedAmount: deductedAmount ? true : false,
      roomData: await this.chatService.getChats(data.roomId),
    });
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
    //   amount: msgData.counter,
    // };
    if (!msgData.amount) {
      await this.chatService.createChat(msgData.roomId, {
        // roomId: msgData.roomId,
        message: msgData.message,
        sentTo: msgData.sentTo,
        sentBy: msgData.sentBy,
        counter: msgData.counter,
        // amount: msgData.counter,
      });
    } else {
      await this.chatService.createCounter(msgData.roomId, {
        sentTo: msgData.sentTo,
        sentBy: msgData.sentBy,
        amount: msgData.counter,
      });
    }
    // this.server.to(msgData.sentTo as string).emit('message', msgData);
    this.server.in(msgData.roomId as string).emit('message', msgData);
  }

  @SubscribeMessage('counter')
  async acceptCounter(@MessageBody() msgData: any) {
    await this.chatService.acceptCounter(msgData.counterId);
    this.server
      .in(msgData.roomId as string)
      .emit('counter', { message: 'counter-accepted', isAccepted: true });
  }

  @SubscribeMessage('counter')
  async rejectCounter(@MessageBody() msgData: any) {
    await this.chatService.rejectCounter(msgData.counterId);
    this.server
      .in(msgData.roomId as string)
      .emit('counter', { message: 'counter-rejected', isAccepted: false });
  }

  @SubscribeMessage('deal-close')
  async dealClose(@MessageBody() msgData: any) {
    await this.chatService.dealClose(msgData.roomId);
    this.server
      .in(msgData.roomId as string)
      .emit('deal-close', { message: 'deal-closed' });
  }
}
