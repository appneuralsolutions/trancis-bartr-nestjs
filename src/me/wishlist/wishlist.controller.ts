import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';
// import { IResponse } from './../../shared/@interfaces/response.interface';
// import { Message } from './../../shared/@constants/messages.constant';
// import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
// import { ResponseError } from './../../shared/@dtos/response.dto';
// import { ErrorMessage } from './../../shared/@constants/error.constant';

@ApiTags('Me -> Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  // @Post()
  // async create(
  //   @Body() createWishlistDto: CreateWishlistDto,
  // ): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_WISHLIST, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_CREATED_WISHLIST,
  //       {},
  //     );
  //   }
  // }

  // @Get()
  // async findAll(): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_WISHLIST, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_WISHLIST,
  //       {},
  //     );
  //   }
  // }

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

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_WISHLIST, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_DELETED_WISHLIST,
  //       {},
  //     );
  //   }
  // }
}
