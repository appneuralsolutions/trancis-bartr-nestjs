import { AuthModule } from './../auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { Module } from '@nestjs/common';
import { NewUserSchema } from 'src/auth/@schemas/new-user.schema';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports:[AuthModule,
    MongooseModule.forFeature([{ name: 'NewUser', schema: NewUserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AdminModule {}
