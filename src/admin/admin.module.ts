import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class AdminModule {}
