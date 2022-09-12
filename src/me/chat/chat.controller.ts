import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/chat-room.dto';
import { CreateChatDto } from './dto/chat.dto';
import { CreateCounterDto } from './dto/counter.dto';
import { Chat } from './interface/chat.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async createRooom(@Body() roomDto: CreateRoomDto): Promise<any> {
    const data = await this.chatService.createRoom(roomDto);
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Post(':roomId')
  async create(
    @Param('roomId') roomId: string,
    @Body() chatDto: CreateChatDto,
  ): Promise<any> {
    const data = await this.chatService.createChat(chatDto);
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }

  @Get(':id')
  async findMy(@Param('id') id: string): // @Me() me: string

  Promise<any> {
    //const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.findMy(id);
    if (data) {
      return data;
    } else {
      return 'not able to fetch';
    }
  }
  @Get(':uuid')
  async findAll(@Param('uuid') uuid: string): // @Me() me: string

  Promise<any> {
    //const userPayload: any = this.jwtService.decode(me);
    console.log(uuid);
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
    //@Me() me: string,
  ): Promise<any> {
    //const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatService.update(id, createFeedbackDto);
    if (data) {
      return data;
    } else {
      return 'not updated';
    }
  }

  @Post()
  async createCounter(@Body() counterDto: CreateCounterDto): Promise<any> {
    const data = await this.chatService.createCounter(counterDto);
    if (data) {
      return data;
    } else {
      return 'Not Created';
    }
  }
}
