import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  categoryId: string;

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
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  images: string[];

  @ApiProperty()
  @IsOptional()
  subject: string;

  @ApiProperty()
  @IsOptional()
  likes: number;

  @ApiProperty()
  @IsOptional()
  views: number;

  @ApiProperty()
  @IsOptional()
  createdBy: string;
}
