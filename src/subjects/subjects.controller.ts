import { ISubject } from './@interfaces/subject.interface';
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
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './@dtos/create-subject.dto';
import { UpdateSubjectDto } from './@dtos/update-subject.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { Message } from './../shared/@constants/messages.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { ErrorMessage } from './../shared/@constants/error.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';

@ApiTags('Subjects')
@Controller()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<IResponse> {
    const createdData = await this.subjectsService.create(createSubjectDto);
    if (createdData) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_CREATED_SUBJECT,
        createdData,
      );
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_SUBJECT,
        {},
      );
    }
  }

  @Get()
  async findAll(): Promise<IResponse | ISubject[]> {
    const subjects = await this.subjectsService.findAll();
    if (true) {
      return subjects;
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_SUBJECT,
        {},
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse | ISubject> {
    const subject = await this.subjectsService.findOne(id);
    if (true) {
      return subject;
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_SUBJECT, {});
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_SUBJECT, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_SUBJECT,
        {},
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_SUBJECT, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_DELETED_SUBJECT,
        {},
      );
    }
  }
}
