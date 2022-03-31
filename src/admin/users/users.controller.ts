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
import { UsersService } from './users.service';
import { CreateUserDto } from './@dtos/create-user.dto';
import { UpdateUserDto } from './@dtos/update-user.dto';
import { IResponse } from './../../shared/@interfaces/response.interface';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { NewUser } from 'src/auth/@interfaces/new-user.interface';

@ApiTags('Admin -> Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IResponse | NewUser> {
    const data = await this.usersService.create(createUserDto)
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_USER, {data});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_CREATED_USER, {});
    }
  }

  @Get()
  async findAll(): Promise<IResponse | NewUser[]> {
    const users = await this.usersService.findAll();
    if (users) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_USERS, {users});
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_USERS,
        {},
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse | NewUser> {
    const user = await this.usersService.findOne(id);
    if (user) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FIND_USER, {user});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_FIND_USER, {});
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponse> {
    const userupdate = await this.usersService.update(id,createUserDto)
    if (userupdate) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_USER, {userupdate});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_UPDATED_USER, {});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    const user = await this.usersService.remove(id)
    if (user) {
      return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_USER, {user});
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_DELETED_USER, {});
    }
  }
}
