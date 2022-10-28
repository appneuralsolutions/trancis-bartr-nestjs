import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { EbayAuthToken } from 'ebay-oauth-nodejs-client';
import { ApiTags } from '@nestjs/swagger';
import eBayApi from 'ebay-api';
import { Me } from 'src/me/@decorators/me.decorator';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { Message } from 'src/shared/@constants/messages.constant';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { IResponse } from 'src/shared/@interfaces/response.interface';
import { EbayDto } from './dto/ebay-intg.dto';
import { EbayIntgService } from './ebay-intg.service';
import { Ebay } from './interface/ebay-intg.interface';

@ApiTags('Ebay')
@Controller('ebay-intg')
export class EbayIntgController {
  eBay: any;
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
    private readonly ebayService: EbayIntgService
  ) {
    this.eBay = new eBayApi({
      appId: 'ashwinR-bartar-PRD-3b44d57bd-5cc21870',
      certId: 'PRD-b44d57bd4ec7-67da-4ca5-82f8-0b9b',
      sandbox: false,
      autoRefreshToken: true,
    });
    this.eBay.OAuth2.on('refreshAuthToken', (token) => {
      console.log(token);
      // Store this token in DB
    });
  }

  @Post()
  async create(
    @Body() ebayDto: EbayDto
  ): Promise<IResponse | Ebay> {
    const data = await this.ebayService.create(
      ebayDto,
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_MY_FEEDBACK, {
        data,
      });
    } else {
      return new ResponseError(
        ErrorMessage.NOT_SUCCESSFULLY_CREATED_MY_FEEDBACK,
        {},
      );
    }
  }

  @Get('search/:query')
  async findByItems(@Param('query') query: string): Promise<any> {
    return new Promise((resolve) => {
      this.eBay.buy.browse
        .search({
          q: query,
          //category_ids: ['15724','12345','34567'],
          //aspect_filter: 'categoryId:15724,Color:{Red}'
        })
        .then((result) => {
          console.log(JSON.stringify(result, null, 2));
          return resolve(result);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
  @Get('category/:query')
  async findBycategory(@Param('query') query: string): Promise<any> {
    return new Promise((resolve) => {
      this.eBay.buy.browse
        .search({
          //q: query,
          category_ids: query,
          //aspect_filter: 'categoryId:15724,Color:{Red}'
        })
        .then((result) => {
          console.log(JSON.stringify(result, null, 2));
          return resolve(result);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  @Get('search/category/:query')
  async findByCategory(@Param('query') query: string): Promise<any> {
    const category = await this.ebayService.findAll();
    let category_arr = []
    for(let i=0; i<category.length; i++){
      category_arr.push(category[i].category)
    }
    return new Promise((resolve) => {
      this.eBay.buy.browse
        .search({
          q: query,
          category_ids: category_arr,
          //aspect_filter: 'categoryId:15724,Color:{Red}'
        })
        .then((result) => {
          console.log(JSON.stringify(result, null, 2));
          return resolve(result);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  // @Get()
  // async findByProfile(@Body() query: Object): Promise<any> {
  //   const ebayAuthToken = new EbayAuthToken({
  //     clientId: 'ashwinR-bartar-SBX-fb454faf4-216e98aa',
  //     clientSecret: 'SBX-b454faf41f41-b179-40bd-8e48-09b4',
  //     redirectUri: 'ashwin_R-ashwinR-bartar--oaikmz',
  //   });

  //   (async () => {
  //     const token = await ebayAuthToken.getApplicationToken('Production');
  //     console.log(token);
  //   })();
  //   const query_value = Object.values(query);
  //   return new Promise((resolve) => {
  //     this.httpService
  //       .get(
  //         `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query_value}`,
  //       )
  //       .subscribe((data) => {
  //         //let result = JSON.stringify(data) comparing price, query
  //         resolve(data.data);
  //         console.log(data);
  //       });
  //   });
  // }
  // @Post('bycategory')
  // async findbyquery(
  //   @Body() sort: Object,
  //   @Body() category_ids: Object,
  // ): Promise<any> {
  //   const sort_value = Object.values(sort);
  //   const category = Object.values(category_ids);
  //   console.log(category);
  //   return new Promise((resolve) => {
  //     this.httpService
  //       .get(
  //         `https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=${category[0]}&sort=${category[1]}`,
  //       )

  //       .subscribe((data) => {
  //         resolve(data.data);
  //         //console.log(data)
  //       });
  //   });
  // }
}
