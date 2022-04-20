import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Ajay' })
  firstName: string;

  // @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Prajapat' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'ajayprajapat@live.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'ajayprajapat' })
  uname: string;


  // @Length(13)
  @IsNotEmpty()
  @ApiProperty({ default: '8769962237' })
  phone: string;

  @IsNotEmpty()
  @ApiProperty({ default: '07-10-1995' })
  dob: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'india' })
  location: string;

  @Length(6)
  @IsNotEmpty()
  @ApiProperty({ default: '12345678' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
