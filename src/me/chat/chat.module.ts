import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypegooseModule } from 'nestjs-typegoose';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypegooseModule.forFeature([Chat])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
