import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email or UserId',
    default: 'ajayprajapat@live.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ default: '12345678' })
  password: string;

  @ApiProperty()
  fcmToken: string;
}
