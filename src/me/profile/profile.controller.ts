import { NewUser } from '../../auth/@interfaces/new-user.interface';
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
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './@dto/create-profile.dto';
// import { UpdateProfileDto } from './@dto/update-profile.dto';
// import { Me } from '../@decorators/me.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../auth/@interfaces/user.interface';
import { Me } from '../@decorators/me.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@ApiTags('Me -> Profile')
@Controller('profile')
export class ProfileController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  @Post('photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile-pics',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadPhoto(
    @UploadedFile() file,
    @Me() me: string,
    @Body(ValidationPipe) createProfileDto: CreateProfileDto,
  ): Promise<IResponse | IUser> {
    // const response = {
    //   originalname: file.originalname,
    //   filename: file.filename,
    // };
    const userPayload: any = this.jwtService.decode(me);
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

  /* @Get()
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
  } */

  @Get('photo')
  async serveAvatar(@Me() me: string, @Res() res): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const myData = await this.userModel.findOne({ email: userPayload.email });
    console.log(myData);
    res.sendFile(myData.picture, { root: './uploads/profile-pics' });
  }

  @Get()
  async findOne(@Me() me: string): Promise<IResponse | IUser> {
    const userPayload: any = this.jwtService.decode(me);
    const user = await this.profileService.findOne(userPayload);
    if (user) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_USER, { user });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_USER, {});
    }
  }

  @Put()
  async update(
    @Me() me: string,
    @Body() CreateProfileDto: CreateProfileDto,
  ): Promise<IResponse | IUser> {
    const userPayload: any = this.jwtService.decode(me);
    const userupdate = await this.profileService.update(
      userPayload,
      CreateProfileDto,
    );
    if (userupdate) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_USER, {
        userupdate,
      });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_USER, {});
    }
  }

  @Delete()
  async remove(@Me() me: string): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const user = await this.profileService.remove(userPayload);
    if (user) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_USER, { user });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_DELETED_USER, {});
    }
  }
}
