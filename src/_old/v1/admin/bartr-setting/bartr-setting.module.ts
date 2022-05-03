import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BartrSettingController } from './bartr-setting.controller';
import { BartrSettingService } from './bartr-setting.service';
import { BartrPointValueSchema } from './schemas/bartrPointValue.schema';
import { BartrRewardPointSchema } from './schemas/bartrReward.schema';

@Module({
    imports: [
     
        MongooseModule.forFeature([
          { name: 'bartrSignupReward', schema: BartrRewardPointSchema },
          { name: 'bartrPointValue', schema: BartrPointValueSchema }
        ]),
      ],
      controllers: [BartrSettingController],
      providers: [BartrSettingService],
      exports: [BartrSettingService, MongooseModule],
})
export class BartrSettingModule {}
