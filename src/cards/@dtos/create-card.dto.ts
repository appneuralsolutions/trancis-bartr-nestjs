import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
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
  hpValue: string;

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
  @IsString()
  year: number;

  @ApiProperty()
  @IsString()
  location: number;

  createdBy: string;

  @ApiProperty()
  latlong: {
    type: string; //'Point'
    coordinates: [number, number];
  };

  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;
}
