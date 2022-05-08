import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { ResponseError, ResponseSuccess } from '../../auth/dtos/response.dto';
import { BartrSettingService } from './bartr-setting.service';
import { BartrPointValueDTO } from './dtos/bartr-point-value.dto';
import { BartrSignupRewardDTO } from './dtos/bartr-signup-reward.dto';
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
}
