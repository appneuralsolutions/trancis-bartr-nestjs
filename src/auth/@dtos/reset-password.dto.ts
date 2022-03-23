import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty({ default: 'user@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ default: '12345' })
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ default: '123456' })
  password: string;
}
