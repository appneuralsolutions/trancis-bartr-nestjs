import { BearerMiddleware } from './../shared/@middleware/bearer.middleware';
import { SharedModule } from 'src/shared/shared.module';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { EbayIntgController } from './ebay-intg.controller';
import { AuthModule } from 'src/auth/auth.module';
import { EbayIntgService } from './ebay-intg.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EbaySchema } from './schemas/ebay-intg.schema';

@Module({
  imports: [SharedModule, AuthModule,
    MongooseModule.forFeature([{ name: 'Ebay', schema:  EbaySchema}]),],
  controllers: [EbayIntgController],
  providers: [EbayIntgService],
})
export class EbayIntgModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerMiddleware).forRoutes('*');
  }
}
