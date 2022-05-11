import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class BartrPointValueDTO {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  bartrPointValue: number;
}
