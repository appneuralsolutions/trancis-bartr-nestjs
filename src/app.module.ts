import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppRoutingModule } from './app.routing.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BearerMiddleware } from './shared/@middleware/bearer.middleware';
import { CardsModule } from './cards/cards.module';
import { ChatModule } from './me/chat/chat.module';
import { EbayIntgModule } from './ebay-intg/ebay-intg.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FeedsModule } from './feeds/feeds.module';
import { MeModule } from './me/me.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SharedModule } from 'src/shared/shared.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';

@Module({
  imports: [
    SharedModule,
    AppRoutingModule,
    MongooseModule.forRoot('mongodb://64.227.166.146:25290/bartr-v1', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypegooseModule.forRoot('mongodb://64.227.166.146:25290/bartr-v1', {}),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '../www'),
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/data',
      rootPath: join(__dirname, './uploads'),
    }),
    AuthModule,
    MeModule,
    AdminModule,
    EbayIntgModule,
    PaymentModule,
    CardsModule,
    FeedbackModule,
    SubjectsModule,
    ChatModule,
    FeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(BearerMiddleware).forRoutes('*');
  // }
  // constructor() {
  //   console.log(join(__dirname, '../uploads'));
  // }
}
