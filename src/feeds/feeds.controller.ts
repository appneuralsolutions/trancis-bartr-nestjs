import { FeedsService } from './feeds.service';
import { Controller, Get, Query } from '@nestjs/common';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from 'src/shared/@constants/messages.constant';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { JwtService } from '@nestjs/jwt';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Feeds')
@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'value', required: false, type: String })
  async findAll(
    @Query('type') type: string,
    @Query('value') value: string,
  ): Promise<IResponse | CreateCard[]> {
    const feed = await this.feedsService.aggregateFeed(type, value);
    if (feed) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, {
        feed,
      });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }
}
