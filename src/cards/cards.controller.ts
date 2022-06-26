import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Delete,
  UseInterceptors,
  ValidationPipe,
  Body,
  Param,
  Put,
  UploadedFiles,
  Patch,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './@dtos/create-card.dto';
// import { UpdateCardDto } from './@dtos/update-card.dto';
import { IResponse } from './../shared/@interfaces/response.interface';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from './../shared/@constants/messages.constant';
import { ResponseError } from './../shared/@dtos/response.dto';
import { ErrorMessage } from './../shared/@constants/error.constant';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { CreateCard } from './@interface/card.interface';
import { imageFileFilter, editFileName } from './@utils/file-upload.utils';
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
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/cards',
        filename: editFileName,
      }),
      limits: { files: 20 },
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() data: CreateCardDto,
    @Me() me: string,
    @UploadedFiles() files: any,
  ): Promise<IResponse | CreateCard> {
    const userPayload: any = this.jwtService.decode(me);
    const createdCard = await this.cardsService.create(data, userPayload);
    const cards = await this.cardsService.uploadImages(
      createdCard._id,
      data,
      files,
    );
    if (cards) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_CARD, { cards });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_CREATED_CARD, {});
    }
  }

  @Get()
  async findAll(): Promise<IResponse | CreateCard> {
    const card = await this.cardsService.findAll();
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): // @Param('id') id: string
  Promise<IResponse | CreateCard> {
    const card = await this.cardsService.findOne(id);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_CARD, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_CARD, {});
    }
  }

  @Patch(':id/images?')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/cards',
        filename: editFileName,
      }),
      limits: { files: 20 },
      fileFilter: imageFileFilter,
    }),
    // FileInterceptor('files', {
    //   storage: diskStorage({
    //     destination: './uploads/cards',
    //     filename: editFileName,
    //   }),
    //   limits: { files: 20 },
    //   fileFilter: imageFileFilter,
    // }),
  )
  async uploadImages(
    @UploadedFiles() files: any,
    @Body() data: CreateCardDto,
    @Param('id') id: string,
  ): Promise<IResponse | CreateCard> {
    const card = await this.cardsService.uploadImages(id, data, files);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_CARD, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_CARD, {});
    }
  }

  @Patch(':id')
  async update(
    @Body(ValidationPipe) data: any,
    @Param('id') id: string,
    @Me() me: string,
  ): Promise<IResponse | CreateCard> {
    const userPayload: any = this.jwtService.decode(me);
    const card = await this.cardsService.update(id, data, userPayload);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_CARD, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_CARD, {});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): // @Param('id') id: string
  Promise<IResponse | CreateCard> {
    const card = await this.cardsService.remove(id);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_CARD, card);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_DELETED_CARD, {});
    }
  }
}
