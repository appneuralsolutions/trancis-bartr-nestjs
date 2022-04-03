import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email or UserId',
    default: 'ajayprajapat@live.com',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({default:  '12345678'})
  password: string;
}
