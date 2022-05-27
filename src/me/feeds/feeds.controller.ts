import { FeedsService } from './feeds.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from 'src/shared/@constants/messages.constant';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { JwtService } from '@nestjs/jwt';
import { Me } from '../@decorators/me.decorator';

@ApiTags('Me -> Feeds')
@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(
    @Me() me: string,
    @Query('categories') categories: string,
  ): Promise<IResponse | CreateCard[]> {
    const userPayload: any = this.jwtService.decode(me);

    const feeds = await this.feedsService.aggregateFeed(
      userPayload,
      categories,
    );
    if (feeds) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, feeds);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }
}
