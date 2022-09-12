import { ApiProperty } from '@nestjs/swagger';
export class CreateCounterDto {
  @ApiProperty({ type: String })
  amount: string;
}
