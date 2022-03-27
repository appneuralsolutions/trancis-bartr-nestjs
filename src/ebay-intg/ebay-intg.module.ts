import { Module } from '@nestjs/common';
import { EbayIntgController } from './ebay-intg.controller';

@Module({
  controllers: [EbayIntgController],
})
export class EbayIntgModule {}
