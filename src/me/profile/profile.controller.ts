import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { IResponse } from './../../shared/@interfaces/response.interface';
import {
  ResponseSuccess,
  ResponseError,
} from './../../shared/@dtos/response.dto';
import { Message } from './../../shared/@constants/messages.constant';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { UpdateProfileDto } from './@dto/update-profile.dto';
import { Me } from '../@decorators/me.decorator';
import { NewUser } from 'src/auth/@interfaces/new-user.interface';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

@ApiTags('Me -> Profile')
@Controller('profile')
export class ProfileController {
  jwtService: any;
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_PROFILE, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_PROFILE,
        {},
      );
    }
  }

  @Post('photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './profiles',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadPhoto(
    @UploadedFile() file,
    @Headers('authorization') authorization: any,
    @Body(ValidationPipe) createProfileDto: CreateProfileDto,
  ): Promise<IResponse | NewUser> {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
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
    const result = await this.profileService.uploadPhoto(
      createProfileDto,
      userPayload,
      file,
    );
    if (result) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPLOAD_PROFILE_PHOTO, {
        result,
      });
    }
  }

  @Get()
  async findAll(): Promise<IResponse> {
    // await this.profileService.findAll();
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_PROFILE, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_PROFILE,
        {},
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse | NewUser> {
    const user = await this.profileService.findOne(id);
    if (user) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_USER, { user });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_USER, {});
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() CreateProfileDto: CreateProfileDto,
  ): Promise<IResponse | NewUser> {
    const userupdate = await this.profileService.update(id, CreateProfileDto);
    if (userupdate) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_USER, {
        userupdate,
      });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_USER, {});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    const user = await this.profileService.remove(id);
    if (user) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_USER, { user });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_DELETED_USER, {});
    }
  }
}
