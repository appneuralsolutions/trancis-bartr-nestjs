import { PushNotificationModule } from './../push_notification/push_notification.module';
import { WishlistSchema } from './../me/wishlist/schemas/wishlist.schema';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './@schemas/card.schema';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    PushNotificationModule,
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    MongooseModule.forFeature([{ name: 'Wishlist', schema: WishlistSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [MongooseModule, CardsService],
})
export class CardsModule {}
