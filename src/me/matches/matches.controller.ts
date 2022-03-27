import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get } from '@nestjs/common';
import { IResponse } from './../../shared/@interfaces/response.interface';
import { MatchesService } from './matches.service';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from './../../shared/@constants/error.constant';

@ApiTags('Me -> Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly MatchesService: MatchesService) {}

  @Get()
  async findAll(): Promise<IResponse> {
    if (false) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MATECHES, {});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_MATECHES, {});
    }
  }
}
