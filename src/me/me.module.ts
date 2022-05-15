import { PreferencesSchema } from './preferences/@schemas/preferences.schema';
import { NewUserSchema } from '../auth/@schemas/new-user.schema';
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
// import { AuthInterceptor } from 'src/auth/@interceptors/auth.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from 'src/cards/@schemas/card.schema';
import { WishlistSchema } from './wishlist/schemas/wishlist.schema';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { ChatModule } from './chat/chat.module';
import { CardsController } from './cards/cards.controller';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  controllers: [
    FeedsController,
    MatchesController,
    ProfileController,
    PreferencesController,
    WishlistController,
    FeedbackController,
    CardsController,
  ],
  imports: [
    AuthModule,
    FeedbackModule,
    CardsModule,
    MongooseModule.forFeature([
      { name: 'NewUser', schema: NewUserSchema },
      { name: 'Perference', schema: PreferencesSchema },
      { name: 'wishlist', schema: WishlistSchema },
    ]),
    ChatModule,
  ],
  providers: [
    FeedsService,
    MatchesService,
    ProfileService,
    PreferencesService,
    WishlistService,
    FeedbackService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor,
    // },
  ],
  exports: [ChatModule],
})
export class MeModule {}
