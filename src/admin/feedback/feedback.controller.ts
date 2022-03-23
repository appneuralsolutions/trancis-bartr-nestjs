import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@ApiTags('Admin -> Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
