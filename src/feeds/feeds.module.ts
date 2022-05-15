import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { CardsModule } from 'src/cards/cards.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [CardsModule, AuthModule],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
