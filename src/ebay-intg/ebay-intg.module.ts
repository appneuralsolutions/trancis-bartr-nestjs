import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';
import { EbayIntgController } from './ebay-intg.controller';

@Module({
  imports: [SharedModule],
  controllers: [EbayIntgController],
})
export class EbayIntgModule {}
