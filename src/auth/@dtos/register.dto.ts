import {
  Gender,
  MaritalStatus,
  IUserSocialLink,
} from './../@interfaces/auth-user.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  //  IsDate,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { IUserProfile } from '../@interfaces/auth-user.interface';
import { IRegister } from './../@interfaces/register.interface';
export class RegisterDto implements IRegister {
  @ApiProperty({ default: 'Ajay' })
  @IsNotEmpty()
  firstName: string;

  middleName: string;

  @ApiProperty({ default: 'Prajapat' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ default: 'ajayprajapat@live.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '8769962237' })
  @Length(10)
  mobileNo: string;

  @ApiProperty({ default: '1234567' })
  @Length(5, 12)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  // @IsDate()
  birthDate: Date;

  @ApiProperty({ default: 'male' })
  gender: Gender;

  maritalStatus: MaritalStatus;
  bio: string;

  constructor() {
    // obj
    // if (!obj.email && obj.mobileNo) {
    // TODO: create  validator for email or mobile (should be one of them)
    // }
  }
}
