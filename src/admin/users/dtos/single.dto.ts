import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class SingleValidationDto {
  // @IsNotEmpty()
  // @IsEmpty()
  // @IsString()
  @IsOptional()
  @Matches(/^ [0-9a-zA-Z]+$/, {message:"Username must be alphanumeric"})
  @ApiProperty({ default: 'jhon01' })
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ default: 'example10@gmail.com' })
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10}$/, {message: "Phone number length must be 10"})
  @ApiProperty({ default: 'Ajay' })
  phone: string;

  
}
