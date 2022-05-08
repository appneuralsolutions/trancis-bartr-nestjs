import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from '../../auth/interfaces/response.interface';
import { BartrSettingService } from '../bartr-setting/bartr-setting.service';
import { BartrPointValueDTO } from '../bartr-setting/dtos/bartr-point-value.dto';
@ApiTags('Bartr-setting/PointValue')
@Controller('bartr-point-setting')
export class BartrPointSettingController {
  constructor(private _bartrSettingService: BartrSettingService) {}
  //for new create
  @Post()
  async createBartrPointValue(
    @Body() createBartrPointDTO: BartrPointValueDTO,
  ): Promise<IResponse> {
    console.log('createBartrSignupReward');
    try {
      const response = await this._bartrSettingService.createBartrPoint(
        createBartrPointDTO,
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
  async getBartrPointValue() {
    try {
      const response = await this._bartrSettingService.getBartrPointValue();
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
