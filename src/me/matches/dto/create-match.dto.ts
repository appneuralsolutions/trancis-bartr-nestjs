import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

export class CreateMatchDto {
  @IsNotEmpty()
  @ApiProperty()
  cardId: string;

  @IsNotEmpty()
  @ApiProperty()
  rightSwiped: boolean;

  userId: string;

  @ApiProperty()
  messagingPayload: MessagingPayload;
}
