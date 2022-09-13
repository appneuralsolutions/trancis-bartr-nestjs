import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Me } from '../@decorators/me.decorator';
// import { Me } from '../@decorators/me.decorator';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/chat-room.dto';
import { CreateChatDto } from './dto/chat.dto';
import { CreateCounterDto } from './dto/counter.dto';

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

  @Post(':roomId')
  async createChat(
    @Param('roomId') roomId: string,
    @Body() chatDto: CreateChatDto,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    chatDto.sentBy = userPayload.userId;
    const data = await this.chatService.createChat(roomId, chatDto);
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

  @Post('counter/:roomId')
  async createCounter(
    @Body() counterDto: CreateCounterDto,
    @Param('roomId') roomId: string,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    counterDto.sentBy = userPayload.userId;
    const data = await this.chatService.createCounter(roomId, counterDto);
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Post('counter/:id/accept')
  async AcceptCounter(@Param('id') id: string, me: string): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.acceptCounter(id);
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Post('counter/:id/reject')
  async RejectCounter(
    @Param('id') id: string,
    @Me() me: string,
  ): // @Me() me: string
  Promise<any> {
    const data = await this.chatService.rejectCounter(id);
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }

  @Get('deal-close/:id')
  async DealClose(@Param('id') id: string, @Me() me: string): Promise<any> {
    const data = await this.chatService.dealClose(id);
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }
}
