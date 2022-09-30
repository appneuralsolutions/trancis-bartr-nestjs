import { ApiProperty } from '@nestjs/swagger';
export class CreateRoomDto {
  @ApiProperty({ type: String })
  userId1: string;

  @ApiProperty({ type: String })
  userId2: string;

  @ApiProperty({ type: String })
  cardId: string;
}
