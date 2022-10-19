import { CreateMatchDto } from './dto/create-match.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { Me } from '../@decorators/me.decorator';
import { PushNotificationDTO } from 'src/push_notification/dto/push_notification.dto';

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

  @Get()
  async findAll(@Me() me: string): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const matches = await this.matchesService.findInterestShown(
      userPayload.userId,
    );
    if (matches) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MATECHES, matches);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_MATECHES, {});
    }
  }

  @Post(':userId')
  async create(
    @Body() createWishlistDto: CreateMatchDto,
    @Body() PushNotificationDTO: PushNotificationDTO,
    @Param('userId') user2: string,
    @Me() me: string,
  ): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.matchesService.create(
      createWishlistDto,
      userPayload,
      PushNotificationDTO
    );
    const isMatched = await this.matchesService.findMatches(
      userPayload.userId,
      user2,
    );
    if (result) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_WISHLIST, {
        isMatched,
      });
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_WISHLIST,
        {},
      );
    }
  }
}

//data:[{liked[{email},{email}]}]
