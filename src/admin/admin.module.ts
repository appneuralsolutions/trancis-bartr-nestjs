import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BartrSettingController } from './bartr-setting/bartr-setting.controller';
import { BartrSettingService } from './bartr-setting/bartr-setting.service';
import { BartrSettingModule } from './bartr-setting/bartr-setting.module';
import { BartrPointSettingController } from './bartr-setting/bartr-point-setting/bartr-point-setting.controller';

@Module({
  imports: [UsersModule, BartrSettingModule],
  providers: [BartrSettingService],
  controllers: [BartrSettingController, BartrPointSettingController],
})
export class AdminModule {}
