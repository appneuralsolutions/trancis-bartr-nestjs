import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
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
  async findByProfile(@Me() me: string): Promise<any> {
    // const userPayload: any = this.jwtService.decode(me);

    const ebaycard = this.httpService
      .get(
        'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3',
      )
      .subscribe((data) => {
        console.log(data);
      });
    if (ebaycard) {
      return ebaycard;
    } else {
      return 'not able to fetch';
    }
  }
}
