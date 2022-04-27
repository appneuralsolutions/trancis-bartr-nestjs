// import { Me } from '../@decorators/me.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Headers,
  HttpException,
  HttpStatus,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './@dto/create-feedback.dto';
// import { UpdateFeedbackDto } from './@dto/update-feedback.dto';
import { IResponse } from './../../shared/@interfaces/response.interface';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from './../../shared/@constants/error.constant';
import { Feedback } from './@entities/feedback.entity';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Me -> Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService,
    private jwtService: JwtService,) {}

  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Headers('authorization') authorization: any
  ): Promise<IResponse | Feedback> {
    if (!authorization) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userPayload: any = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );
    if (!userPayload) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.feedbackService.create(createFeedbackDto, userPayload);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_MY_FEEDBACK, {
        data,
      });
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
  async findMy(@Headers('authorization') authorization: any): // @Me() me: string
  Promise<IResponse> {
    if (!authorization) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userPayload: any = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );
    if (!userPayload) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.feedbackService.findMy(userPayload);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MY_FEEDBACK, data);
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_MY_FEEDBACK,
        {},
      );
    }
  }

  @Put('?')
  async update(@Body() createFeedbackDto: CreateFeedbackDto, @Query('id') id: string,
  @Headers('authorization') authorization: any):
  Promise<IResponse> {
    if (!authorization) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userPayload: any = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );
    if (!userPayload) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.feedbackService.update(id, createFeedbackDto);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_MY_FEEDBACK, data);
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_MY_FEEDBACK,
        {},
      );
    }
  }

   @Delete()
   async remove(@Headers('authorization') authorization: any,
   @Query("id") id: string): Promise<IResponse> {
    if (!authorization) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userPayload: any = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );
    if (!userPayload) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.feedbackService.remove(id);
     if (data) {
       return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_MY_FEEDBACK, data);
     } else {
       return new ResponseError(
         ErrorMessage.NOT_SUCCESSFULLY_DELETED_MY_FEEDBACK,
         {},
       );
     }
   }
}
