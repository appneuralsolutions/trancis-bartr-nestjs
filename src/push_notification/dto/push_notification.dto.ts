import { ApiProperty } from '@nestjs/swagger';

export class PushNotificationDTO {
  @ApiProperty()
  public readonly fcmToken: string;
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly body: string;
  @ApiProperty()
  public readonly userId: string;
}
