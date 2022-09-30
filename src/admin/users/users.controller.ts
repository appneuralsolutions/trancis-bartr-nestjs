import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { IResponse } from '../../auth/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from '../../auth/@dtos/response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SingleValidationDto } from './dtos/single.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('validation')
  @HttpCode(HttpStatus.CREATED)
  async singlevalidation(
    @Body() SingleValidationDto: SingleValidationDto,
  ): Promise<any> {
    try {
      const result = await this.usersService.singlevalidation(
        SingleValidationDto,
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      await this.usersService.createUser(createUserDto);
      return new ResponseSuccess('', {});
    } catch (error) {
      return new ResponseError('USER.NOT_CREATED_SUCCESSFULLY');
    }
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  async getUsers() {
    console.log('get all user');
    try {
      return await this.usersService.getUsers();
    } catch (error) {
      return new ResponseError('USER.NOT_FETCHED_SUCCESSFULLY');
    }
  }

  @Get(':id/photo')
  async serveAvatar(@Res() res: any, @Param('id') id: string): Promise<any> {
    const user = await this.usersService.getUser(id);
    res.sendFile(user.picture, { root: './' });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    console.log('get user by id', id);
    try {
      return await this.usersService.getUser(id);
    } catch (error) {
      return new ResponseError('USER.NOT_FETCHED_SUCCESSFULLY');
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.usersService.updateRole(id, updateUserDto);
      return new ResponseSuccess('', {});
    } catch (error) {
      return new ResponseError('USER.NOT_UPDATED_SUCCESSFULLY');
    }
  }

  @Post(':id/add-bartr-point')
  async addBartrPoint(@Param('id') id: string) {
    return await this.usersService.addBartPoint(id);
  }

  @Post(':id/deduct-bartr-point/:cardId')
  async deductBartrPoint(@Param('id') id: string, @Param('cardId') cardId: string) {
    return await this.usersService.deductBartPoint(id, cardId);
  }

  @Get(':id/bartr-point')
  async getBartrPoint(@Param('id') id: string) {
    const user: any = await this.usersService.getBartPoint(id);
    return user.bartrPoints;
  }

  // @Patch(':id')
  // @HttpCode(HttpStatus.CREATED)
  // async patchUser(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   try {
  //     await this.usersService.updateRole(id, updateUserDto);
  //     return new ResponseSuccess('', {});
  //   } catch (error) {
  //     return new ResponseError('USER.NOT_UPDATED_SUCCESSFULLY');
  //   }
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async deleteUser(@Param('id') id: string) {
    try {
      await this.usersService.deleteRole(id);
      return new ResponseSuccess('', {});
    } catch (error) {
      return new ResponseError('USER.NOT_DELETED_SUCCESSFULLY');
    }
  }
}
