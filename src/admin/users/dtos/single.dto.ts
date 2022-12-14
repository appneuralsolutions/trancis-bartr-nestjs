import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Matches } from 'class-validator';

export class SingleValidationDto {
  // @IsNotEmpty()
  // @IsEmpty()
  // @IsString()
  @IsOptional()
  @ApiProperty({ default: 'jhon01' })
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ default: 'example10@gmail.com' })
  email: string;

  @IsOptional()
  @Matches(/^\d{10}$/, { message: 'Phone number length must be 10' })
  @ApiProperty({ default: 'Ajay' })
  phone: string;
}
