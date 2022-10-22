import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EbayAuthToken } from 'ebay-oauth-nodejs-client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ebay')
@Controller('ebay-intg')
export class EbayIntgController {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
  ) {
    // this.httpService
    //   .get(
    //     'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3',
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }

  @Get()
  async findByProfile(@Body() query: Object): Promise<any> {
    const ebayAuthToken = new EbayAuthToken({
      clientId: 'ashwinR-bartar-SBX-fb454faf4-216e98aa',
      clientSecret: 'SBX-b454faf41f41-b179-40bd-8e48-09b4',
      redirectUri: 'ashwin_R-ashwinR-bartar--oaikmz',
    });

    (async () => {
      const token = await ebayAuthToken.getApplicationToken('Production');
      console.log(token);
    })();
    const query_value = Object.values(query);
    return new Promise((resolve) => {
      this.httpService
        .get(
          `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query_value}`,
        )
        .subscribe((data) => {
          //let result = JSON.stringify(data) comparing price, query
          resolve(data.data);
          console.log(data);
        });
    });
  }
  @Post('bycategory')
  async findbyquery(
    @Body() sort: Object,
    @Body() category_ids: Object,
  ): Promise<any> {
    const sort_value = Object.values(sort);
    const category = Object.values(category_ids);
    console.log(category);
    return new Promise((resolve) => {
      this.httpService
        .get(
          `https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=${category[0]}&sort=${category[1]}`,
        )

        .subscribe((data) => {
          resolve(data.data);
          //console.log(data)
        });
    });
  }
}
