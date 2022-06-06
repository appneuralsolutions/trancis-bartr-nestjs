import { ChatModule } from './me/chat/chat.module';
import { SharedModule } from 'src/shared/shared.module';
import { BearerMiddleware } from './shared/@middleware/bearer.middleware';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app.routing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MeModule } from './me/me.module';
import { EbayIntgModule } from './ebay-intg/ebay-intg.module';
import { PaymentModule } from './payment/payment.module';
import { CardsModule } from './cards/cards.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { FeedsModule } from './feeds/feeds.module';

@Module({
  imports: [
    SharedModule,
    AppRoutingModule,
    MongooseModule.forRoot('mongodb://localhost:29029/bartr-v1', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypegooseModule.forRoot('mongodb://localhost:29029/bartr-v1', {}),
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
