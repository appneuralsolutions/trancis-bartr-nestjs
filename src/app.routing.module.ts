import { FeedbackModule } from './feedback/feedback.module';
import { CardsModule } from './cards/cards.module';
import { SubjectsModule } from './subjects/subjects.module';
import { AuthModule } from './auth/auth.module';
import { EbayIntgModule } from './ebay-intg/ebay-intg.module';
import { MeModule } from './me/me.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'subjects',
        module: SubjectsModule,
      },
      {
        path: 'cards',
        module: CardsModule,
      },
      {
        path: 'feedback',
        module: FeedbackModule,
      },
      {
        path: 'ebay',
        module: EbayIntgModule,
      },
      {
        path: 'me',
        module: MeModule,
      },
      {
        path: 'payment',
        module: PaymentModule,
      },
    ]),
  ],
  exports: [],
})
export class AppRoutingModule {}
