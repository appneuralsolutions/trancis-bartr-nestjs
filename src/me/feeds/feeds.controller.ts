import { FeedsService } from './feeds.service';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from 'src/shared/@constants/messages.constant';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Me -> Feeds')
@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly FeedsService: FeedsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(
    @Headers('authorization') authorization: any,
  ): Promise<IResponse | CreateCard[]> {
    if (!authorization) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userPayload: any = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );
    if (!userPayload) {
      throw new HttpException(
        'authorization token is not define or invalid',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const feed = await this.FeedsService.aggregateFeed();
      if (feed) {
        return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, {
          feed,
        });
      } else {
        return new ResponseError(
          ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD,
          {},
        );
      }
    }
  }
}
