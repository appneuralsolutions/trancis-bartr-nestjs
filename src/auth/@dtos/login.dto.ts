import { ApiProperty } from '@nestjs/swagger';
import { ILogin } from '../@interfaces/login.interface';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto implements ILogin {
  @ApiProperty({ default: 'user@email.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ default: '12345' })
  @IsNotEmpty()
  password: string;
}
