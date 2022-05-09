import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class BartrSignupRewardDTO {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  bartrSignupReward: number;
}
