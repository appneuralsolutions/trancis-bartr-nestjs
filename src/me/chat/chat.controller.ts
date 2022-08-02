import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/chat.dto';
import { Chat } from './interface/chat.interface';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
      ) {}

      @Post()
      async create(
        @Body() chatDto: CreateChatDto,
      ): Promise<any> {
        const data = await this.chatService.create(
            chatDto
        );
        if (data) {
          return data
        } else {
          return "Not Created"
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
          return "not able to fetch"
        }
      }
      @Get(':user')
      async findAll(@Param('user') user: string): // @Me() me: string
      
      Promise<any> {
       
        //const userPayload: any = this.jwtService.decode(me);
        console.log(user)
        const data = await this.chatService.findAll(user);
        if (data) {
          return data;
        } else {
          return "not able to fetch"
        }
      }
    
      @Put(':id')
      async update(
        @Body() createFeedbackDto: CreateChatDto,
        @Param('id') id: string
        //@Me() me: string,
      ): Promise<any> {
        //const userPayload: any = this.jwtService.decode(me);
        const data = await this.chatService.update(
          id,
          createFeedbackDto,
        );
        if (data) {
          return data
        } else {
            return "not updated"
        }
      }

}
