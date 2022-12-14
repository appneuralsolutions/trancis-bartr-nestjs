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
import { Body } from '@nestjs/common';
import { PushNotificationDTO } from 'src/push_notification/dto/push_notification.dto';

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
    @InjectModel('Deducted-Amount')
    private readonly deductedAmountModel: Model<any>,
    public chatService: ChatService,
  ) {}

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
      // cardDetails: this.cardModel.findOne({ _id: data.cardId }),
      isDeductedAmount: deductedAmount ? true : false,
      // roomData: await this.chatService.getChats(
      //   data.roomId,
      //   data.userId,
      //   data.cardId,
      // ),
      roomData: await this.chatService.getAllCardChatsInARoom(
        data.roomId,
        data.userId,
      ),
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
      await this.chatService.createChat(
        msgData.roomId,
        {
          // roomId: msgData.roomId,
          message: msgData.message,
          cardId: msgData.cardId,
          sentTo: msgData.sentTo,
          sentBy: msgData.sentBy,
          counter: msgData.counter,
          messagingPayload: msgData.messagingPayload,
          // amount: msgData.counter,
        },
        msgData.messagingPayload,
      );
      this.server.in(msgData.roomId as string).emit('message', msgData);
    } else {
      const counter = await this.chatService.createCounter(
        msgData.roomId,
        {
          cardId: msgData.cardId,
          sentTo: msgData.sentTo,
          sentBy: msgData.sentBy,
          amount: msgData.amount,
          messagingPayload: msgData.messagingPayload,
        },
        msgData.messagingPayload,
      );
      this.server.in(msgData.roomId as string).emit('message', {
        ...msgData,
        counter: counter._id,
        isAccepted: counter.isAccepted,
      });
    }
    // this.server.to(msgData.sentTo as string).emit('message', msgData);
  }

  @SubscribeMessage('accept-counter')
  async acceptCounter(@MessageBody() msgData: any) {
    await this.chatService.acceptCounter(
      msgData.counterId,
      msgData.cardId,
      msgData.pushNotification,
      msgData.messagingPayload,
    );
    this.server
      .in(msgData.roomId as string)
      .emit('counter', { message: 'counter', isAccepted: true });
  }

  @SubscribeMessage('reject-counter')
  async rejectCounter(@MessageBody() msgData: any) {
    await this.chatService.rejectCounter(
      msgData.counterId,
      msgData.cardId,
      msgData.pushNotification,
      msgData.messagingPayload,
    );
    this.server
      .in(msgData.roomId as string)
      .emit('counter', { message: 'counter', isAccepted: false });
  }

  @SubscribeMessage('deal-close')
  async dealClose(@MessageBody() msgData: any) {
    await this.chatService.dealClose(
      msgData.roomId,
      msgData.cardId,
      msgData.pushNotification,
      msgData.messagingPayload,
      msgData.isDealClosed,
      msgData.isCompleteDealClosed,
      msgData.dealType,
    );
    this.server
      .in(msgData.roomId as string)
      .emit('deal-close', { message: 'deal-closed' });
  }
}

//TODO: chat created deal closed room created
