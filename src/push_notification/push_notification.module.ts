import { Module } from '@nestjs/common';
import { PushNotificationController } from './push_notification.controller';
import { PushNotificationService } from './push_notification.service';

@Module({
  controllers: [PushNotificationController],
  providers: [PushNotificationService]
})
export class PushNotificationModule {}
