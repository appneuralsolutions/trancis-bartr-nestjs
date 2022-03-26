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
import { IResponse } from './../../shared/@interfaces/response.interface';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from './../../shared/@constants/error.constant';

@ApiTags('Me -> Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto
  ): Promise<IResponse> {
    if (false) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_MY_FEEDBACK, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_MY_FEEDBACK,
        {},
      );
    }
  }

  // @Get()
  // findAll() {
  //   return this.feedbackService.findAll();
  // }

  @Get()
  async findMy(@Me() me: string): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MY_FEEDBACK, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_MY_FEEDBACK,
        {},
      );
    }
  }

  @Patch()
  async update(
    @Me() me: string, 
    @Body() updateFeedbackDto: UpdateFeedbackDto
  ): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_MY_FEEDBACK, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_MY_FEEDBACK,
        {},
      );
    }
  }

  @Delete()
  async remove(@Me() me: string): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_MY_FEEDBACK, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_DELETED_MY_FEEDBACK,
        {},
      );
    }
  }
}
