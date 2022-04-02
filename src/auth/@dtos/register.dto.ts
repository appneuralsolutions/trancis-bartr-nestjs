import { Gender } from './../@interfaces/auth-user.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  //  IsDate,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { IUserProfile } from '../@interfaces/auth-user.interface';
import { IRegister } from './../@interfaces/register.interface';
export class RegisterDto implements IRegister {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(10)
  mobileNo: string;

  @ApiProperty()
  @Length(5, 12)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  // @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ default: 'male' })
  gender: Gender;

  profile: IUserProfile;

  constructor() {
    // obj
    // if (!obj.email && obj.mobileNo) {
    // TODO: create  validator for email or mobile (should be one of them)
    // }
  }
}
