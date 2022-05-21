import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';
import { EbayIntgController } from './ebay-intg.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [EbayIntgController],
})
export class EbayIntgModule {}
