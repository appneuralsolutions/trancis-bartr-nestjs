import { HttpService } from '@nestjs/axios';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}
  use(req: Request, res: Response, next: () => void) {
    this.httpService.axiosRef.interceptors.request.use((res) => {
      res.headers = {
        ...res.headers,
        Authorization:
          req.headers['Authorization'] ||
          'Bearer ' +
            'v^1.1#i^1#I^3#r^0#p^1#f^0#t^H4sIAAAAAAAAAOVYa2wURRzv9YUFgYSoIBY5VyS8dm/23rf0Tq+U2jPQFq6Wtj7I7O5sb9u93XNnluulGGqtRWPgg4mPRAw1ahQwUYgJiuIH4yOi1hfBaIyg5YOVREMaKkYxzt2Vcq0IpT1jE/fLZmb+z9/8HzMDukrLVvTW9P462zajsK8LdBXabPwsUFZasnJOUeHCkgKQQ2Dr61rSVdxd9GMFhnEtIWxEOGHoGNk74pqOhcxkkLFMXTAgVrGgwzjCApGEaHj9OsHJASFhGsSQDI2xR6qCjEeWgNfD+/28x+0JeEU6q5+X2WDQdS/yIp/bKwPklRXJTdcxtlBExwTqJMg4gdPJAg/rdDXwQODdAs9zfp+nhbE3IhOrhk5JOMCEMuYKGV4zx9ZLmwoxRiahQphQJFwdrQtHqtbWNlQ4cmSFRnCIEkgsPHa0xpCRvRFqFrq0GpyhFqKWJCGMGUcoq2GsUCF83phJmJ+BmnfxAa/Xxzs9CDl5IOYFymrDjENyaTvSM6rMKhlSAelEJanLIUrRENuQREZGtVREpMqe/m2woKYqKjKDzNrKcHO4vp4JQRxLqvpGVoQmgSYbrWxiFdHtcStQcbNO3osCfghHtGRFjWA8Ts0aQ5fVNGLYXmuQSkRNRuOBATnAUKI6vc4MKyRtTi6dcxRA0JLe0ewWWiSmpzcVxSkK9szw8vCPchNiqqJF0KiE8QsZfIIMTCRUmRm/mAnEkdjpwEEmRkhCcDiSySSXdHGG2epwAsA7mtavi0oxFIdMljad65RevTwDq2ZckRDlxKpAUglqSwcNVGqA3sqEXDTJfYER3MeaFRo/+7eJHJ8dY9MhX+kBXQrkfTKvuCS3P+Dx5SM9QiMR6kjbgUSYYuPQbEckoUEJsRKNMyuOTFUWXB7F6fIriJW9AYV1BxSFFT2yl+UVhABCoigF/P+bLJlonEeRZCKSr0DPT5DjGN/i9SarIitTOkCOJr9Y2dGw6T6nVVeDtBiIVOntWtsWbUMy2RycaCpc1Pk1mkqRaaD68wdAOtfzAUKNgQmSp+ReVDISqN7QVCk1vTbYZcr1NH9SlVaKjqNI0+hvSq6GE4lI3sp1fpy8kkoxOafz2qP+i/50Ua9wOmqnl1dpfkwFwITKpTsQJxlxhwGtdK6TWHp6c8Zq+z8R5hI5RCvFtVoIE2qJTI9/E2ZSaSXnaDOTJ86SbZXUiYmz0LuFbElkUooyPZmjaKqtMYKvSGfHVEARLa19SkGn0jvDtAo56m7Wb1XOHva5jPMc3iJxJsKGZdJ7DleXPv42GO1Ip+cJYhqahsxGfsqVNB63CBQ1NN1Kah6qiwonedgp7ra9/W/5xXs9LhcAfs/Utk7KHGc2T7eekNdGeAVXGsfY15VQQebju22HQbftjUKbDfgAy68Ey0uL7iwuuprBtJRwGOqyaHRwKlQ4WsV0SCwTce0olYCqWVhqU785Kp3NedfpuwcsGH3ZKSviZ+U884DyCysl/Nz5s51O4HG6eMC7eb4F3HxhtZi/rviacxVLUkc/e2dw3R+Mq/cTbtUDd23aCWaPEtlsJQU0CAvCyrMnezr7owcHV+O2Zw6ciF+7//73OwaXFT50ZF+n/sBw+elzktyzeuZjlT3Dfy4+s2JW0+7P33x07ok5W7trf9j51U/qdxWf2ko+OuluBnN2sXO/Pb1gx+748O2dby16uXTRw98v9Q+8suOpGcPXH+89lRryDGjv/a73fLH7t7O+wapVry6tDnq3rz7S+FLTmQ8eOXxw3h17D3WVv8bt+qXmya39t7xYvbf+3fWPv/7c/AF0m3746zPbxQ/Ll7mvWjzUM9S5b8PPwRvdN3z5YP/Q88x+fGDL2YWpY3u7upLVL2yHewpufXr5TYNPtO0aOHLvPGVe38diaw881CPvKIvbm/f0V5/adlysm3nMse3u7Db+BYuKPQZxEwAA',
      };
      return res;
    });
    next();
  }
}
