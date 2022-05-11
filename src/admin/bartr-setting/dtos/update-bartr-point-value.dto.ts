import { ApiProperty } from '@nestjs/swagger';

export class UpdateBartrPointValue {
  @ApiProperty({ default: 1 })
  bartrPointValue: number;
}
