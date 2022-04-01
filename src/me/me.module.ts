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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from 'src/auth/@interceptors/auth.interceptor';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NewUserSchema } from 'src/auth/@schemas/new-user.schema';

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
