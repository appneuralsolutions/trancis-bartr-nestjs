import { UsersService } from './users/users.service';
import { SubjectsService } from './subjects/subjects.service';
import { UsersController } from './users/users.controller';
import { SubjectsController } from './subjects/subjects.controller';
import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackController } from './feedback/feedback.controller';

@Module({
  controllers: [SubjectsController, UsersController, FeedbackController],
  providers: [SubjectsService, UsersService, FeedbackService],
})
export class AdminModule {}
