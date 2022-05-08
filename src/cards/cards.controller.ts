import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  // Body,
  Patch,
  // Param,
  Delete,
  UseInterceptors,
  ValidationPipe,
  Body,
  UploadedFile,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './@dtos/create-card.dto';
// import { UpdateCardDto } from './@dtos/update-card.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from './../shared/@constants/messages.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { ErrorMessage } from './../shared/@constants/error.constant';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { CreateCard } from './@interface/card.interface';
import { imageFileFilter, editFileName } from './utils/file-upload.utils';
import { JwtService } from '@nestjs/jwt';
import { Me } from 'src/me/@decorators/me.decorator';

@ApiTags('Cards')
@Controller()
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() data: CreateCardDto,
    @Me() me: string,
  ): Promise<IResponse | CreateCard> {
    const card = await this.cardsService.create(data, me);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_CARD, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_CREATED_CARD, {});
    }
  }

  @Get()
  async findAll(): Promise<IResponse | CreateCard> {
    const card = await this.cardsService.findAll();
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }

  @Get('me')
  async findByProfile(
    @Headers('authorization') authorization: any,
  ): Promise<IResponse | CreateCard> {
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
    }
    const card = await this.cardsService.findByProfile(userPayload);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): // @Param('id') id: string
  Promise<IResponse | CreateCard> {
    const card = await this.cardsService.findOne(id);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_CARD, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_CARD, {});
    }
  }
  @Put('/images?')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './card',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(
    @UploadedFile() file,
    @Body() data: CreateCardDto,
    @Query('id') id: string,
  ): Promise<IResponse | CreateCard> {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const card = await this.cardsService.uploadImage(id, data, file);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_CARD, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_CARD, {});
    }
  }

  @Put('?')
  async update(
    @Body(ValidationPipe) data: CreateCardDto,
    @Query('id') id: string,
  ): // @Param('id') id: string,
  // @Body() updateCardDto: UpdateCardDto,
  Promise<IResponse | CreateCard> {
    const card = await this.cardsService.update(id, data);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_CARD, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_CARD, {});
    }
  }

  @Delete('?')
  async remove(@Query('id') id: string): // @Param('id') id: string
  Promise<IResponse | CreateCard> {
    const card = await this.cardsService.remove(id);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_CARD, { card });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_DELETED_CARD, {});
    }
  }
}
