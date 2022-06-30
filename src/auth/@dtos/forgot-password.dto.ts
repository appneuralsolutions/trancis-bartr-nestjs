import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty({ default: 'ajayprajapat@live.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ default: '123456' })
  password: string;
}
