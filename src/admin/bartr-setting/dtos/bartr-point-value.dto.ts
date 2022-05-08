import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class BartrPointValueDTO {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  bartrPointValue: number;
}
