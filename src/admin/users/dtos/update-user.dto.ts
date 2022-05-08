import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  // @IsNotEmpty()
  // @IsEmpty()
  // @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Ajay' })
  firstName: string;

  // @IsNotEmpty()
  // @IsEmpty()
  // @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Prajapat' })
  lastName: string;

  // // @IsNotEmpty()
  // // @IsEmpty()
  // // @IsString()
  // @IsOptional()
  // @ApiProperty({ default: 'ajayprajapat' })
  // uname: string;

  // @Length(13)
  // @IsNotEmpty()
  // @ApiProperty({ default: '8769962237' })
  // phone: string;

  // @IsNotEmpty()
  // @IsEmpty()
  @IsOptional()
  @ApiProperty({ default: '07-10-1995' })
  dob: string;

  // @IsNotEmpty()
  // @IsEmpty()
  @IsOptional()
  @ApiProperty({ default: 'india' })
  location: string;

  @IsOptional()
  @ApiProperty({ default: 'Seller' })
  userType: string;
}
