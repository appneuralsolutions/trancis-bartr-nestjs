import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class EmailVerificationDto {
  @IsEmail()
  @ApiProperty({
    default: 'ajayprajapat@live.com',
  })
  email: string;

  @IsNotEmpty()
  @IsOptional()
  emailToken: string;

  @IsNotEmpty()
  @IsOptional()
  timestamp: string;
}
