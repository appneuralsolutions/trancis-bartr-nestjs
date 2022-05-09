import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Feedback } from './@interfaces/feedback.interface';
import { FeedbackService } from './feedback.service';
// import { CreateFeedbackDto } from './dto/create-feedback.dto';
// import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from './../shared/@constants/messages.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { ErrorMessage } from './../shared/@constants/error.constant';

@ApiTags('Feedback')
@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // @Post()
  // async create(
  //   @Body() createFeedbackDto: CreateFeedbackDto,
  // ): Promise<IResponse | Feedback> {
  //   const data = await this.feedbackService.create(createFeedbackDto);
  //   if (data) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_FEEDBACK, {
  //       data,
  //     });
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_CREATED_FEEDBACK,
  //       {},
  //     );
  //   }
  // }

  @Get()
  async findAll(): Promise<IResponse | Feedback> {
    const feedback = await this.feedbackService.findAll();
    if (feedback) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_FEEDBACK, {
        feedback,
      });
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_FEEDBACK,
        {},
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    const feedback = await this.feedbackService.findOne(id);
    if (feedback) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_FEEDBACK, {
        feedback,
      });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_FEEDBACK, {});
    }
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() createFeedbackDto: CreateFeedbackDto,
  // ): Promise<IResponse> {
  //   const feedback = await this.feedbackService.update(id, createFeedbackDto);
  //   if (feedback) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_FEEDBACK, {
  //       feedback,
  //     });
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_UPDATED_FEEDBACK,
  //       {},
  //     );
  //   }
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<IResponse> {
  //   const feedback = await this.feedbackService.remove(id);
  //   if (feedback) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_FEEDBACK, {
  //       feedback,
  //     });
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_DELETED_FEEDBACK,
  //       {},
  //     );
  //   }
  // }
}
