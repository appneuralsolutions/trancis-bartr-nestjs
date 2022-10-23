import { PushNotificationModule } from './../push_notification/push_notification.module';
import { MatchSchema } from './wishlist/schemas/matches.schema';
import { PreferencesSchema } from './preferences/@schemas/preferences.schema';
import {
  ChatRoomSchema,
  ChatSchema,
  CounterSchema,
} from './chat/schema/chat.schema';
import { AuthModule } from '../auth/auth.module';
import { WishlistService } from './wishlist/wishlist.service';
import { PreferencesService } from './preferences/preferences.service';
import { ProfileService } from './profile/profile.service';
import { PreferencesController } from './preferences/preferences.controller';
import { ProfileController } from './profile/profile.controller';
import { Module } from '@nestjs/common';
import { FeedsController } from './feeds/feeds.controller';
import { MatchesController } from './matches/matches.controller';
import { WishlistController } from './wishlist/wishlist.controller';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';
import { FeedsService } from './feeds/feeds.service';
import { MatchesService } from './matches/matches.service';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistSchema } from './wishlist/schemas/wishlist.schema';
import { PurchaseFeedbackSchema } from './purchase_feedback/schema/purchase_feedback.schema';
import { FeedbackModule } from 'src/feedback/feedback.module';
//import { ChatModule } from './chat/chat.module';
import { CardsController } from './cards/cards.controller';
import { CardsModule } from 'src/cards/cards.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat/chat.gateway';
import { DeductedAmountSchema } from 'src/admin/users/schemas/deducted-amount.schema';
import { PurchaseFeedbackController } from './purchase_feedback/purchase_feedback.controller';
import { PurchaseFeedbackService } from './purchase_feedback/purchase_feedback.service';
import { PurchaseCardController } from './purchase_card/purchase_card.controller';
import { PurchaseCardService } from './purchase_card/purchase_card.service';
import { PurchaseCardSchema } from './purchase_card/schema/purchase_card.schema';
import { UserSchema } from 'src/auth/@schemas/user.schema';
import { UsersService } from 'src/admin/users/users.service';
import { UsersModule } from 'src/admin/users/users.module';

@Module({
  controllers: [
    FeedsController,
    MatchesController,
    ProfileController,
    PreferencesController,
    WishlistController,
    FeedbackController,
    CardsController,
    ChatController,
    PurchaseFeedbackController,
    PurchaseCardController,
  ],
  imports: [
    AuthModule,
    FeedbackModule,
    CardsModule,
    UsersModule,
    PushNotificationModule,
    MongooseModule.forFeature([
      // { name: 'NewUser', schema: NewUserSchema },
      { name: 'Perference', schema: PreferencesSchema },
      { name: 'Wishlist', schema: WishlistSchema },
      { name: 'Match', schema: MatchSchema },
      { name: 'Chat', schema: ChatSchema },
      { name: 'ChatRoom', schema: ChatRoomSchema },
      { name: 'Counter', schema: CounterSchema },
      { name: 'Deducted-Amount', schema: DeductedAmountSchema },
      { name: 'PurchaseFeedback', schema: PurchaseFeedbackSchema},
      { name: 'PurchaseCard', schema: PurchaseCardSchema},
      { name: 'User', schema: UserSchema },
    ]),
    //ChatModule,
  ],
  providers: [
    PurchaseFeedbackService,
    FeedsService,
    MatchesService,
    ProfileService,
    PreferencesService,
    WishlistService,
    FeedbackService,
    ChatService,
    ChatGateway,
    PurchaseCardService,
    UsersService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor,
    // },
  ],
  //exports: [ChatModule],
})
export class MeModule {}
