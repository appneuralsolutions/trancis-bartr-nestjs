import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCardSchema } from './@schemas/card.schema';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    MongooseModule.forFeature([{ name: 'card', schema: CreateCardSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
