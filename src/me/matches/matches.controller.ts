import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  // , Post, Get
} from '@nestjs/common';
// import { IResponse } from './../../shared/@interfaces/response.interface';
import { MatchesService } from './matches.service';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from './../../shared/@constants/error.constant';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { CardsService } from '../../cards/cards.service';
import { Me } from '../@decorators/me.decorator';
import { response } from 'express';

@ApiTags('Me -> Matches')
@ApiBearerAuth()
@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private jwtService: JwtService,
  ) {}

  // @Get()
  // async findAll(@Me() me: string): Promise<IResponse> {
  //   const userPayload: any = this.jwtService.decode(me);
  //   const people = [];
  //   const match = [];
  //   const mycard = await this.cardsService.findByProfile(userPayload);
  //   mycard.map((likedCards) => {
  //     console.log(likedCards.title, likedCards.liked);
  //     people.push({ title1: likedCards.title, liked1: likedCards.liked });
  //     this.cardsService.findformatch(likedCards.liked).then((result) =>
  //       result.map((person2liked) => {
  //         if (person2liked.liked == userPayload.userId) {
  //           match.push({
  //             title1: likedCards.title,
  //             title2: person2liked.title,
  //           });
  //         }
  //       }),
  //     );
  //   });
  //   if (mycard) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MATECHES, { match });
  //   } else {
  //     return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_MATECHES, {});
  //   }
  // }

  @Get(':userId')
  async findAll(
    @Me() me: string,
    @Param('userId') userId: string,
  ): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const matches = await this.matchesService.findMatches(
      userPayload.userId,
      userId,
    );
    if (matches) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MATECHES, matches);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_MATECHES, {});
    }
  }
}

//data:[{liked[{email},{email}]}]
