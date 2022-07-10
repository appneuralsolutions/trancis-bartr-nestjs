import { FeedsService } from './feeds.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from 'src/shared/@constants/messages.constant';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { JwtService } from '@nestjs/jwt';
import { Me } from '../@decorators/me.decorator';

@ApiTags('Me -> Feeds')
@ApiBearerAuth()
@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(
    @Me() me: string,
    @Query() queries: string,
  ): Promise<IResponse | CreateCard[]> {
    const userPayload: any = this.jwtService.decode(me);

    const feeds = await this.feedsService.aggregateFeed(userPayload, queries);
    if (feeds) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, feeds);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }
}
