import {IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePreferenceDto  {
  @ApiProperty()
  @IsOptional()
  typeofCard: string

  @ApiProperty()
  @IsOptional()
  ebayPoints: string
  
  @ApiProperty()
  @IsOptional()
  price: {
    condition: string,
    value: string
 };

  @ApiProperty()
  @IsOptional()
  title: string;


  @ApiProperty()
  @IsOptional()
  value: {
    condition: string,
    value: string
  };

  @ApiProperty()
  @IsOptional()
  description: string;

}

