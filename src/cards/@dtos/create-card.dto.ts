import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  availableOf: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  lable: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  subject: string;

  @ApiProperty()
  @IsOptional()
  likes: number;

  @ApiProperty()
  @IsOptional()
  views: number;
}
