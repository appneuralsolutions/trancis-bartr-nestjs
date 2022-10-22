import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppRoutingModule } from './app.routing.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
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
import { MessagesController } from './chat/controllers/messages/messages.controller';
import { RoomsController } from './chat/controllers/rooms/rooms.controller';
import { MessagesGateway } from './chat/gateways/messages/message.gateway';
import { Message } from './chat//models/message.model';
import { Room } from './chat/models/room.model';
import { User } from './chat/models/user.model';
import { PushNotificationModule } from './push_notification/push_notification.module';
@Module({
  imports: [
    SharedModule,
    AppRoutingModule,
    // MongooseModule.forRoot('mongodb://localhost:27017/bartr-v1', {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // }),
    // TypegooseModule.forRoot('mongodb://localhost:27017/bartr-v1', {}),
    MongooseModule.forRoot('mongodb://64.227.166.146:25290/bartr-v1', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypegooseModule.forRoot('mongodb://64.227.166.146:25290/bartr-v1', {}),
    TypegooseModule.forFeature([Message, Room, User]),
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
    FeedsModule,
    PushNotificationModule,
  ],
  controllers: [AppController, MessagesController, RoomsController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(BearerMiddleware).forRoutes('*');
  // }
  // constructor() {
  //   console.log(join(__dirname, '../uploads'));
  // }
}
