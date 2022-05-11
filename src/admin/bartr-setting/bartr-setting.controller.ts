import {
  Body,
  Controller,
  Get,
  Put,
  HttpStatus,
  Post,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { BartrSettingService } from './bartr-setting.service';
import { BartrSignupRewardDTO } from './dtos/bartr-signup-reward.dto';
import { UpdateBartrSingupReward } from './dtos/update-bartr-signup-reward.dto';
@ApiTags('Bartr-setting/SignupReward')
@Controller('bartr-setting')
export class BartrSettingController {
  constructor(private _bartrSettingService: BartrSettingService) {}

  //for new create
  @Post()
  async createBartrSignupReward(
    @Body() createBartrSignupRewardDTO: BartrSignupRewardDTO,
  ): Promise<IResponse> {
    console.log('createBartrSignupReward');
    try {
      const response = await this._bartrSettingService.createBartrSignupReward(
        createBartrSignupRewardDTO,
      );
      console.log(response, 'bartr reward point created');
      const responseObj: any = {
        statusCode: 201,
        data: response,
        success: true,
      };
      return responseObj;
    } catch (error) {
      console.log('error', error);
      const responseObj: any = {
        statusCode: 500,
        data: [],
        errorMessage: error,
        success: false,
      };
      return responseObj;
    }
  }

  //getting the value
  @Get()
  async getBartrSignupReward() {
    try {
      const response =
        await this._bartrSettingService.getBartrSignupRewardValue();
      console.log(response, 'get bartr reward points');
      const responseObj: any = {
        statusCode: 200,
        data: response,
        success: true,
      };
      return responseObj;
    } catch (error) {
      console.log(error);
      const responseObj: any = {
        statusCode: 500,
        data: [],
        errorMessage: error,
        success: false,
      };
      return responseObj;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateSignupRewardValue(
    @Param('id') id: string,
    @Body() BartrSignupRewardDTO: UpdateBartrSingupReward,
  ) {
    try {
      const updatedSignupRewardValueObj =
        await this._bartrSettingService.updateSignupRewardValue(
          id,
          BartrSignupRewardDTO,
        );
      console.log(updatedSignupRewardValueObj);
      const responseObj: any = {
        statusCode: HttpStatus.OK,
        data: updatedSignupRewardValueObj,
        success: true,
      };
      return responseObj;
    } catch (error) {
      return error;
    }
  }
}
