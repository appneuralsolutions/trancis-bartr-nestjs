import { Controller, Get, Param, Patch, Body,ValidationPipe } from '@nestjs/common';
import { Me } from '../@decorators/me.decorator';
import { ResponseSuccess, ResponseError } from 'src/shared/@dtos/response.dto';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { CardsService } from '../../cards/cards.service';
import { Message } from 'src/shared/@constants/messages.constant';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PushNotificationDTO } from 'src/push_notification/dto/push_notification.dto';

@ApiTags('Me -> cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(
    private cardsService: CardsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findByProfile(@Me() me: string): Promise<IResponse | CreateCard> {
    const userPayload: any = this.jwtService.decode(me);

    const card = await this.cardsService.findByProfile(userPayload);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }

  @Get(':id')
  async findOneByProfile(
    @Me() me: string,
    @Param('id') id: string,
  ): Promise<IResponse | CreateCard> {
    const userPayload: any = this.jwtService.decode(me);

    const card = await this.cardsService.findOneByProfile(id, userPayload);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }



  @Get('user/:id')
  async findByUser(
    @Me() me: string,
    @Param('id') id: string,
  ): Promise<IResponse | CreateCard> {
    const userPayload: any = this.jwtService.decode(me);

    const cards = await this.cardsService.findUserCardsByAuthUser(
      userPayload,
      id,
    );
    if (cards) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, cards);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }


  //TODO:update api with push notification
}
