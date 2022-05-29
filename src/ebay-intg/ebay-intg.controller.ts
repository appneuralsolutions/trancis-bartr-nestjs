import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Me } from 'src/me/@decorators/me.decorator';

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
      let query_value = Object.values(query)
      return new Promise((resolve) => {
        this.httpService
      .get(
        `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query_value}`,
      )
      .subscribe((data) => {
        //let result = JSON.stringify(data) comparing price, query
        resolve(data.data);
        console.log(data)
      });
    }
    )}
    @Post('bycategory')
    async findbyquery(@Body() sort: Object,@Body() category_ids: Object): Promise<any> {
      let sort_value = Object.values(sort)
      let category = Object.values(category_ids)
      console.log(category)
      return new Promise((resolve) =>{
        this.httpService.get(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?category_ids=${category[0]}&sort=${category[1]}`)
    
        .subscribe((data) => {
          resolve(data.data);
          //console.log(data)
        })
      })
    }
}
