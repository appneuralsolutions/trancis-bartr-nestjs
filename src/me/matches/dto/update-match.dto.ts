import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './create-match.dto';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  like: boolean;
}
