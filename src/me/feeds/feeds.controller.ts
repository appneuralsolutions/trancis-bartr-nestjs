import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Me -> Feeds')
@Controller('feeds')
export class FeedsController {}
