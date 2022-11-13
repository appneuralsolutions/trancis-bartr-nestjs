import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Me } from '../@decorators/me.decorator';
// import { Me } from '../@decorators/me.decorator';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/chat-room.dto';
import { CreateChatDto } from './dto/chat.dto';
import { CreateCounterDto } from './dto/counter.dto';
import { PushNotificationDTO } from 'src/push_notification/dto/push_notification.dto';
import { Message } from 'src/shared/@constants/messages.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';

@ApiTags('Chat and Counter')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  @Post('rooms')
  async createRooom(
    @Body() roomDto: CreateRoomDto,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.createRoom(roomDto);
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Get('rooms')
  async getRooom(
    @Me() me: string,
    @Query('byUsers') byUsers: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.getRooms(byUsers, userPayload.userId); //byUsers
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Get(':roomId/chats')
  async getChats(
    @Param('roomId') roomId: string,
    @Me() me: string,
    // @Query('byUsers') byUsers: string,
  ): Promise<any> {
    const data = await this.chatService.getChats(roomId); //byUsers

    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Get(':roomId/chats/all')
  async getChatsAll(
    @Param('roomId') roomId: string,
    @Me() me: string,
    // @Query('byUsers') byUsers: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.getAllCardChatsInARoom(
      roomId,
      userPayload.userId,
    ); //byUsers

    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Post(':roomId')
  async createChat(
    @Param('roomId') roomId: string,
    @Body() chatDto: CreateChatDto,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    chatDto.sentBy = userPayload.userId;
    const data = await this.chatService.createChat(
      roomId,
      chatDto,
      chatDto.messagingPayload,
    );
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Get(':id')
  async findMy(@Param('id') id: string, @Me() me: string): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.findMy(id);
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Get(':uuid')
  async findAll(
    @Param('uuid') uuid: string,
    @Me() me: string,
  ): // @Me() me: string

  Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.findAll(uuid);
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Get(':roomId/cards-in-room')
  async getCardsInARoom(
    @Param('roomId') roomId: string,
    @Me() me: string,
  ): // @Me() me: string

  Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.getCardsInARoom(
      roomId,
      userPayload.userId,
    );
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Put(':id')
  async update(
    @Body() createFeedbackDto: CreateChatDto,
    @Param('id') id: string,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    createFeedbackDto.sentBy = userPayload.userId;
    const data = await this.chatService.update(id, createFeedbackDto);
    if (data) {
      return data;
    } else {
      return 'not updated';
    }
  }

  @Post('counter/:roomId/:cardId')
  async createCounter(
    @Body() counterDto: CreateCounterDto,
    @Param('roomId') roomId: string,
    @Param('cardId') cardId: string,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    counterDto.sentBy = userPayload.userId;
    const data = await this.chatService.createCounter(
      roomId,
      counterDto,
      counterDto.messagingPayload,
    );
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Post('counter/:roomId/:id/:cardId/accept')
  async AcceptCounter(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
    @Param('cardId') cardId: string,
    me: string,
    @Body() pushNotificationDTO: PushNotificationDTO,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.acceptCounter(
      id,
      cardId,
      pushNotificationDTO,
      pushNotificationDTO.messagingPayload,
    );
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Post('counter/:roomId/:id/reject')
  async RejectCounter(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
    @Param('cardId') cardId: string,
    @Me() me: string,
    @Body() pushNotificationDTO: PushNotificationDTO,
  ): // @Me() me: string
  Promise<any> {
    const data = await this.chatService.rejectCounter(
      id,
      cardId,
      pushNotificationDTO,
      pushNotificationDTO.messagingPayload,
    );
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Post('deal-close/:id/:cardId')
  async DealClose(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @Me() me: string,
    @Body() pushNotificationDTO: PushNotificationDTO,
  ): Promise<any> {
    const data = await this.chatService.dealClose(
      id,
      cardId,
      pushNotificationDTO,
      pushNotificationDTO.messagingPayload,
      pushNotificationDTO.isDealClosed,
      pushNotificationDTO.isCompleteDealClosed,
    );
    return new ResponseSuccess(Message.DEAL_CLOSED, data);
  }

  @Get('deal-close/:id/:cardId')
  async getDealClose(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @Me() me: string,
  ): Promise<any> {
    const data = await this.chatService.getDealClose(id, cardId);
    if (data) {
      return new ResponseSuccess(Message.DEAL_CLOSED, data);
    } else {
      return new ResponseSuccess(Message.NO_RECORD_IN_DEAL, null);
    }
  }
}
