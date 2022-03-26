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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { UpdateProfileDto } from './@dto/update-profile.dto';
import { Me } from '../@decorators/me.decorator';

@ApiTags('Me -> Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

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
  async uploadPhoto(): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPLOAD_PROFILE_PHOTO, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPLOAD_PROFILE_PHOTO,
        {},
      );
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
  async findOne(@Param('id') id: string): Promise<IResponse> {
    // return await this.profileService.findOne(+id);
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_PROFILE, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_PROFILE,
        {},
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_PROFILE, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_PROFILE,
        {},
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_PROFILE, {});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_DELETED_PROFILE,
        {},
      );
    }
  }
}
