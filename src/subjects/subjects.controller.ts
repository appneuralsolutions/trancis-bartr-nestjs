import { ISubject } from './@interfaces/subject.interface';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '../shared/utils/file-upload.utils';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './@dtos/create-subject.dto';
import { UpdateSubjectDto } from './@dtos/update-subject.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { Message } from './../shared/@constants/messages.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { ErrorMessage } from './../shared/@constants/error.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { CreateSubjectCategoryDto } from './@dtos/create-subject-category.dto';
import { ISubjectCategory } from './@interfaces/subject-category.interface';

@ApiTags('Subjects')
@Controller()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(
    @Body() createSubjectDto: CreateSubjectDto,
  ): Promise<IResponse | ISubject> {
    const createdData = await this.subjectsService.createSubject(
      createSubjectDto,
    );
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

  @Post(':id/categories')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/subject-categories',
        filename: editFileName,
      }),
      limits: { files: 20 },
      fileFilter: imageFileFilter,
    }),
  )
  async createSubjectCategory(
    @UploadedFiles() files,
    @Body() createSubjectCategoryDto: CreateSubjectCategoryDto,
    @Param('id') subjectId: string,
  ): Promise<IResponse | ISubjectCategory> {
    const result = await this.subjectsService.uploadSubjectCategoryPhoto(
      subjectId,
      createSubjectCategoryDto,
      files,
    );

    if (result) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_SUBJECT, result);
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_SUBJECT,
        {},
      );
    }
  }

  @Get(':id/categories/:cid/photo')
  async serveAvatar(
    @Param('id') subjectId: string,
    @Param('cid') categoryId: string,
    @Res() res,
  ): Promise<any> {
    // const userPayload: any = this.jwtService.decode(me);
    const myData = await this.subjectsService.findOneCategory(categoryId);
    res.sendFile(myData.image, { root: './' });
  }

  @Get()
  async findAll(): Promise<IResponse | ISubject[]> {
    const subjects = await this.subjectsService.findAll();
    if (subjects) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_CREATED_SUBJECT,
        subjects,
      );
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
    if (subject) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_SUBJECT, subject);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_SUBJECT, {});
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<IResponse | ISubject> {
    const subject = await this.subjectsService.update(id, updateSubjectDto);
    if (subject) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_SUBJECT, {
        subject,
      });
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_SUBJECT,
        {},
      );
    }
  }

  @Patch(':id/categories/:cid')
  async updateCategory(
    @Param('id') id: string,
    @Param('cid') cid: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<IResponse | ISubject> {
    const subject = await this.subjectsService.udpateCategory(
      cid,
      updateSubjectDto,
    );
    if (subject) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_SUBJECT, {
        subject,
      });
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_SUBJECT,
        {},
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    const subject = await this.subjectsService.remove(id);
    if (subject) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_SUBJECT, {
        subject,
      });
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_DELETED_SUBJECT,
        {},
      );
    }
  }

  @Delete(':id/categories/:cid')
  async deleteCategory(
    @Param('id') id: string,
    @Param('cid') cid: string,
  ): Promise<IResponse | ISubject> {
    const subject = await this.subjectsService.deleteCategory(id, cid);
    if (subject) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_SUBJECT, subject);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_SUBJECT, {});
    }
  }
}
