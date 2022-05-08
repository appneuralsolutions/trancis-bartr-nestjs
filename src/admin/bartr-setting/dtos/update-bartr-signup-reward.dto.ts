import { ApiProperty } from '@nestjs/swagger';


export class UpdateBartrSingupReward {

  @ApiProperty({ default: 1 })
  bartrSignupReward: number;

  }
