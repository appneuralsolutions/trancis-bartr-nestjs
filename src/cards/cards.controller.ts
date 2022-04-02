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
  HttpStatus
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

@ApiTags('Cards')
@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService,
    private jwtService: JwtService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
        storage: diskStorage({
            destination: './card',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),
)
  async create(@UploadedFile() file, @Headers('authorization') authorization: any 
  ,@Body(ValidationPipe) data: CreateCardDto ): 
  Promise<IResponse | CreateCard> {
    if((!authorization)) {
      throw new HttpException(
          'authorization token is not define or invalid',
          HttpStatus.BAD_REQUEST,
      )
  }
  const response = {
      originalname: file.originalname,
      filename: file.filename,
  };
  let userPayload: any = this.jwtService.decode(authorization.replace('Bearer ', ''));
  if((!userPayload)) {
      throw new HttpException(
          'authorization token is not define or invalid',
          HttpStatus.BAD_REQUEST,
      )
  }
  let card =  this.cardsService.create(data, userPayload, file);
    if (card) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_CARD, {card});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_CREATED_CARD, {});
    }
  }

  @Get()
  async findAll(): Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_CARDS, {});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_ALL_FIND_CARD, {});
    }
  }

  @Get()
  async findOne(): // @Param('id') id: string
  Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_CARD, {});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_CARD, {});
    }
  }
  @Patch(':id')
  async update(): // @Param('id') id: string,
  // @Body() updateCardDto: UpdateCardDto,
  Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_CARD, {});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_CARD, {});
    }
  }

  @Delete(':id')
  async remove(): // @Param('id') id: string
  Promise<IResponse> {
    if (true) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_CARD, {});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_DELETED_CARD, {});
    }
  }
}
