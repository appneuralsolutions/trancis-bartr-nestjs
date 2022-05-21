import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';

@Controller('ebay-intg')
export class EbayIntgController {
  constructor(private httpService: HttpService) {
    httpService.get('https://api.publicapis.org/entries').subscribe((data) => {
      console.log(data);
    });
  }
}
