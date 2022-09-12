import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { IResponse } from './../../shared/@interfaces/response.interface';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from './../../shared/@constants/error.constant';
import { JwtService } from '@nestjs/jwt';
import { Me } from '../@decorators/me.decorator';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@ApiTags('Me -> Wishlist')
@ApiBearerAuth()
@Controller('wishlist')
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Me() me: string,
  ): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.wishlistService.create(
      createWishlistDto,
      userPayload,
    );
    if (result) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_WISHLIST, result);
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_WISHLIST,
        {},
      );
    }
  }

  @ApiQuery({
    name: 'onlyValid',
    required: false,
    type: Boolean,
  })
  @Get()
  async findAll(
    @Me() me: string,
    @Query('onlyValid') onlyValid: boolean,
  ): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.wishlistService.findAll(userPayload, onlyValid);

    if (result) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_FIND_ALL_WISHLIST,
        result,
      );
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_WISHLIST,
        {},
      );
    }
  }

  @ApiQuery({
    name: 'onlyValid',
    required: false,
    type: Boolean,
  })
  @Get('matches')
  async findAllMatch(
    @Me() me: string,
    @Query('onlyValid') onlyValid: boolean,
  ): Promise<IResponse> {
    const matches = [];
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.wishlistService.findAll(userPayload, onlyValid);
    result.map((wishlist) => {
      this.wishlistService
        .findMatch(wishlist.createdBy, onlyValid)
        .then((response) =>
          response.map((match) => {
            if (match.createdBy === userPayload._id) {
              matches.push({
                title1: wishlist.title,
                user1: userPayload._id,
                title2: match.title,
                user2: match.createdBy,
              });
            }
          }),
        );
    });
    if (matches) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_FIND_ALL_MATCHES,
        matches,
      );
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_MATCHES,
        {},
      );
    }
  }

  @ApiQuery({
    name: 'onlyValid',
    required: false,
    type: Boolean,
  })
  @Get('singlematch/:id')
  async findSingleMatch(
    @Me() me: string,
    @Query('onlyValid') onlyValid: boolean,
    @Param('id') id: string,
  ): Promise<IResponse> {
    const matches = [];
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.wishlistService.findAll(userPayload, onlyValid);
    const user1 = result.filter((wishlist) => {
      wishlist.createdBy == id;
    });
    user1.map((user) => {
      matches.push({
        title1: user.title,
        user1: userPayload._id,
      });
    });
    this.wishlistService.findMatch(id, onlyValid).then((response) =>
      response.map((match) => {
        if (match.createdBy === userPayload._id) {
          matches.push({
            title2: match.title,
            user2: match.createdBy,
          });
        }
      }),
    );
    if (matches) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_FIND_ALL_MATCHES,
        matches,
      );
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_MATCHES,
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

  @Put(':id')
  async update(
    @Me() me: string,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.wishlistService.update(
      id,
      userPayload,
      updateWishlistDto,
    );
    if (result) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_WISHLIST, result);
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_UPDATED_WISHLIST,
        {},
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    const result = await this.wishlistService.remove(id);
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
