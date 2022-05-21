import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Me } from 'src/me/@decorators/me.decorator';
import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { Message } from 'src/shared/@constants/messages.constant';
import { ResponseError, ResponseSuccess } from 'src/shared/@dtos/response.dto';

@Controller('ebay-intg')
export class EbayIntgController {
    
    constructor(private httpService: HttpService, private jwtService: JwtService) {
    
  }
  @Get()
  async findByProfile(@Me() me: string): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);

    const ebaycard = this.httpService.get('https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3').subscribe((data) => {
      console.log(data);
    });;
    if (ebaycard) {
      return ebaycard ;
    } else {
      return "not able to fetch";
    }
  }
}
