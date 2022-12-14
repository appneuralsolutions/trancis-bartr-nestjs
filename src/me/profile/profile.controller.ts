import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { IResponse } from './../../shared/@interfaces/response.interface';
import {
  ResponseSuccess,
  ResponseError,
} from './../../shared/@dtos/response.dto';
import { Message } from './../../shared/@constants/messages.constant';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Body,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  Put,
  Res,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './@dto/create-profile.dto';
// import { UpdateProfileDto } from './@dto/update-profile.dto';
// import { Me } from '../@decorators/me.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '../../shared/utils/file-upload.utils';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../auth/@interfaces/user.interface';
import { Me } from '../@decorators/me.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@ApiTags('Me -> Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  @Put('photo')
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
    res.sendFile(myData.picture, { root: './' });
  }

  @Get()
  async findOne(@Me() me: string): Promise<IResponse | IUser> {
    const userPayload: any = this.jwtService.decode(me);
    console.log(userPayload);
    const user = await this.profileService.findOne(userPayload);
    console.log(user);
    if (user) {
      console.log('if');
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_USER, { user });
    } else {
      console.log('else');
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_USER, {});
    }
  }

  @Patch()
  async update(
    @Me() me: string,
    @Body() createProfileDto: any,
  ): Promise<IResponse | IUser> {
    const userPayload: any = this.jwtService.decode(me);
    const userupdate = await this.profileService.update(
      userPayload,
      createProfileDto,
    );
    if (userupdate) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_USER, {
        userupdate,
      });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_USER, {});
    }
  }

  @Patch('usertype')
  async updateType(
    @Me() me: string,
    @Body() createProfileDto: any,
  ): Promise<IResponse | IUser> {
    const userPayload: any = this.jwtService.decode(me);
    const userupdate = await this.profileService.updateUsertype(
      userPayload,
      createProfileDto,
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
