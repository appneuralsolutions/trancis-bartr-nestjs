import { ApiProperty } from '@nestjs/swagger';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

export class PushNotificationDTO {
  @ApiProperty()
  public readonly fcmToken: string;
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly body: string;
  @ApiProperty()
  public readonly userId: string;
  @ApiProperty()
  messagingPayload: MessagingPayload;

  @ApiProperty()
  isDealClosed: string;

  @ApiProperty()
  isCompleteDealClosed: string;

  @ApiProperty()
  dealType: string;
}
