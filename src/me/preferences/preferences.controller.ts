import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './@dto/create-preference.dto';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { Message } from 'src/shared/@constants/messages.constant';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { CreateCard } from 'src/cards/@interface/card.interface';
import { JwtService } from '@nestjs/jwt';
import { Me } from '../@decorators/me.decorator';
// import { UpdatePreferenceDto } from './@dto/update-preference.dto';
// import { IResponse } from './../../shared/@interfaces/response.interface';
// import { Message } from './../../shared/@constants/messages.constant';
// import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
// import { ResponseError } from './../../shared/@dtos/response.dto';
// import { ErrorMessage } from './../../shared/@constants/error.constant';

@ApiTags('Me -> Preferences')
@ApiBearerAuth()
@Controller('preferences')
export class PreferencesController {
  constructor(
    private readonly preferencesService: PreferencesService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Me() me: string,
    @Body() data: CreatePreferenceDto,
  ): Promise<IResponse | CreateCard[]> {
    const perference = await this.preferencesService.create(data);

    if (perference) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_CARD, {
        perference,
      });
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_CREATED_CARD, {});
    }
  }

  // @Post()
  // async create(
  //   @Body() createPreferenceDto: CreatePreferenceDto,
  // ): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_PREFERENCE, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_CREATED_PREFERENCE,
  //       {},
  //     );
  //   }
  // }

  // @Get()
  // async findAll(): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_FIND_ALL_PREFERENCE, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_FIND_ALL_PREFERENCE,
  //       {},
  //     );
  //   }
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_FIND_PREFERENCE, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_FIND_PREFERENCE,
  //       {},
  //     );
  //   }
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updatePreferenceDto: UpdatePreferenceDto,
  // ): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_UPDATED_PREFERENCE, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_UPDATED_PREFERENCE,
  //       {},
  //     );
  //   }
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<IResponse> {
  //   if (true) {
  //     return new ResponseSuccess(Message.SUCCESSFULLY_DELETED_PREFERENCE, {});
  //   } else {
  //     return new ResponseError(
  //       ErrorMessage.NOT_SUCCESSFULLY_DELETED_PREFERENCE,
  //       {},
  //     );
  //   }
  // }
}
