import { Module } from '@nestjs/common';
import { PushNotificationController } from './push_notification.controller';
import { PushNotificationService } from './push_notification.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
