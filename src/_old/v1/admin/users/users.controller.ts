import { IUser } from './interfaces/user.interface';
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
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { IResponse } from '../../../../_old/v1/auth/interfaces/response.interface';
import {
  ResponseError,
  ResponseSuccess,
} from '../../../../_old/v1/auth/dtos/response.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

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
    try {
      return await this.usersService.getUsers();
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

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async patchUser(
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
