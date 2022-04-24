import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
   Get,
   Post,
   Body,
   Patch,
   Put,
   Param,
   Delete,
   Headers,
   HttpException,
   HttpStatus
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { IResponse } from './../../shared/@interfaces/response.interface';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from './../../shared/@constants/error.constant';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Me -> Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService,
    private jwtService: JwtService,) {}

   @Post()
   async create(
     @Body() createWishlistDto: CreateWishlistDto,
     @Headers('authorization') authorization: any,
   ): Promise<IResponse> {
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
    const result = await this.wishlistService.create(createWishlistDto, userPayload)
     if (result) {
       return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_WISHLIST, result);
     } else {
      return new ResponseError(
         ErrorMessage.NOT_SUCCESSFULLY_CREATED_WISHLIST,
         {},
       );
     }
   }

   @Get()
   async findAll(@Headers('authorization') authorization: any): Promise<IResponse> {
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
    const result = await this.wishlistService.findAll(userPayload)
     if (result) {
       return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_WISHLIST, result);
     } else {
       return new ResponseError(
         ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_WISHLIST,
         {},
       );
     }
   }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_FIMD_WISHLIST, {});
  //   } else {
  //     return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIMD_WISHLIST, {});
  //   }
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateWishlistDto: UpdateWishlistDto,
  // ): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_WISHLIST, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_UPDATED_WISHLIST,
  //       {},
  //     );
  //   }
  // }

   @Delete(':id')
   async remove(@Param('id') id: string,
   @Headers('authorization') authorization: any): Promise<IResponse> {
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
    const result = await this.wishlistService.remove(id)
     if (result) {
       return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_WISHLIST, result);
     } else {
       return new ResponseError(
         ErrorMessage.NOT_SUCCESSFULLY_DELETED_WISHLIST,
         {},
       );
     }
   }
}
