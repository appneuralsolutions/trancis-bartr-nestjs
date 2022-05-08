import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class BartrSignupRewardDTO {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  bartrSignupReward: Number;
}
