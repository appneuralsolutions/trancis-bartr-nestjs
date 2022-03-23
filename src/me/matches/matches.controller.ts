import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Me -> Matches')
@Controller('matches')
export class MatchesController {}
