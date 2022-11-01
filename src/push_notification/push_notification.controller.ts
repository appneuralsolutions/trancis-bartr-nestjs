import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationDTO } from './dto/push_notification.dto';
import { PushNotificationService } from './push_notification.service';

@Controller('push-notification')
export class PushNotificationController {
  constructor(
    private readonly pushnotificationService: PushNotificationService,
  ) {}
  @Post()
  async send(@Body() pushnotificationDto: PushNotificationDTO) {
    console.log(`method called ${this.send.name}()`);
    return await this.pushnotificationService.send(
      pushnotificationDto,
      pushnotificationDto.messagingPayload,
    );
  }
}
