import { Me } from '../@decorators/me.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './@dto/create-feedback.dto';
import { UpdateFeedbackDto } from './@dto/update-feedback.dto';

@ApiTags('Me -> Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  // @Get()
  // findAll() {
  //   return this.feedbackService.findAll();
  // }

  @Get()
  findMy(@Me() me: string) {
    return this.feedbackService.findMy(+me);
  }

  @Patch()
  update(@Me() me: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(+me, updateFeedbackDto);
  }

  @Delete()
  remove(@Me() me: string) {
    return this.feedbackService.remove(+me);
  }
}
