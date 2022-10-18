import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Ajay' })
  firstName: string;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Prajapat' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ default: 'ajayprajapat@live.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'ajayprajapat' })
  uname: string;

  // @Length(13)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: '8769962237' })
  phone: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 'Buyer' })
  userType: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: '07-10-1995' })
  dob: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 'india' })
  location: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ default: '12345678' })
  password: string;

  @IsOptional()
  picture: string;

  @IsOptional()
  @ApiProperty()
  latlong: {
    type: string; //'Point'
    coordinates: [number];
  };
  @ApiProperty()
  fcmToken: string;
}
