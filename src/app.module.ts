import { AppRoutingModule } from './app.routing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MeModule } from './me/me.module';
import { EbayIntgModule } from './ebay-intg/ebay-intg.module';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import { CardsModule } from './cards/cards.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    AppRoutingModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bartr', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),
    AuthModule,
    MeModule,
    AdminModule,
    EbayIntgModule,
    PaymentModule,
    CardsModule,
    FeedbackModule,
    SubjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
