import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailVerificationDto {
  @IsEmail()
  @ApiProperty({
    default: 'ajayprajapat@live.com',
  })
  email: string;

  @IsNotEmpty()
  emailToken: string;

  @IsNotEmpty()
  timestamp: string;
}
