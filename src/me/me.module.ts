import { PreferencesSchema } from './preferences/@schemas/preferences.schema';
import { NewUserSchema } from './../auth/@schemas/new-user.schema';
import { AuthModule } from './../_old/v1/auth/auth.module';
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
import { CreateCardSchema } from 'src/cards/@schemas/card.schema';
import { WishlistSchema } from './wishlist/schemas/wishlist.schema';

@Module({
  controllers: [
    FeedsController,
    MatchesController,
    ProfileController,
    PreferencesController,
    WishlistController,
    FeedbackController,
  ],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'NewUser', schema: NewUserSchema }]),
    MongooseModule.forFeature([{ name: 'Card', schema: CreateCardSchema }]),
    MongooseModule.forFeature([{ name: 'Perference', schema: PreferencesSchema }]),
    MongooseModule.forFeature([{name: 'wishlist', schema: WishlistSchema}])
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
})
export class MeModule {}
