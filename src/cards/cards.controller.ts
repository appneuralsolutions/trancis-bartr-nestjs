import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './@dtos/create-card.dto';
import { UpdateCardDto } from './@dtos/update-card.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from './../shared/@constants/messages.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { ErrorMessage } from './../shared/@constants/error.constant';

@ApiTags('Cards')
@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  async create(@Body() createCardDto: CreateCardDto): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_CARD, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_EMAIL_TOKEN,
        {},
      );
    }
  }

  @Get()
  async findAll(): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_CARD, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_EMAIL_TOKEN,
        {},
      );
    }
  }

  @Get()
  async findOne(@Param('id') id: string): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_EMAIL_TOKEN,
        {},
      );
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto
  ): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_CARD, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_EMAIL_TOKEN,
        {},
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_CARD, {});
    } else {
      return new ResponseError(
        ErrorMessage.LOGIN_NOT_SUCCESSFULLY_SENT_EMAIL_TOKEN,
        {},
      );
    }
  }
}
