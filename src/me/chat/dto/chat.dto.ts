import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
export class CreateChatDto {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  sentTo: string;

  @IsOptional()
  sentBy: string;

  counter: string;

  @ApiProperty()
  messagingPayload: MessagingPayload;
}
