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
            "v^1.1#i^1#p^1#f^0#I^3#r^0#t^H4sIAAAAAAAAAOVYbWwURRju9YOmFFRAEQRjsyoByu7N7n1vudMrBTlDactda1tFMrs721u6t3vszHJ30cSmCeUHCIj+MPyABjRETAg/JAaJ/FESMIoEVFRiQjRowY8gSuRPxbnrB9eKUNozNvH+XHbmfd95n2fej5kBXVMqFves7PljuqO8uLcLdBU7HHwlqJhSVn1PSfFDZUUgT8DR2/VYV2l3Sd9SDBN6UlyDcNI0MKpKJ3QDi7nBIGNbhmhCrGHRgAmERSKL0XD9KlHggJi0TGLKps5UReqCjCTIHp/Pr/Au5HW7EU9HjSGbMTPIKB6Jd/lVRVEVvwcAQOcxtlHEwAQaJMgIQBBY4GGFQIz3i4AXBS/n9/jamaoWZGHNNKgIB5hQzl0xp2vl+Xp7VyHGyCLUCBOKhFdEG8KRuuWrY0udebZCgzxECSQ2Hvm1zFRQVQvUbXT7ZXBOWozasowwZpyhgRVGGhXDQ86Mw/0c1YIKgUeQZAUCwe0TXAWhcoVpJSC5vR/ZEU1h1ZyoiAyikcydGKVsSOuRTAa/VlMTkbqq7F+TDXVN1ZAVZJbXhtvCjY1MCOJ4SjPWsBK0CLTYaG0rq0puj1uFqpsVeC8K+CEcXGXA1CDHo5ZZZhqKlmUMV602SS2iLqORxPhETx4xVKjBaLDCKsm6kycngCEC3VTOObSFNokb2U1FCcpCVe7zzvQPaxNiaZJN0LCF0RM5foIMTCY1hRk9mQvEwdhJ4yATJyQpOp2pVIpLuTjT6nAKAPDO1vpVUTmOEpAZkM3mOpXX7qzAajkoMqKaWBNJJkl9SdNApQ4YHUzI5ffzvsAg7yPdCo0e/dtAHmbnyHQoVHrwUA4EeAXJAEFJChQkPUKDEerM+oEkmGET0OpEJKlDGbEyjTM7gSxNEV0eVaBlDrGKN6Cy7oCqspJH8bK8ihBASJLkgP9/kyVjjfMoki1EChXohQlyHOfbvd5UXaQ6YwDkbPVLtenYMxsEu2El0uMgUmd06us36k2pVFtwrKlwS/DLdI0yE6PrF46AbK4XgoSVJiZImRC8qGwmUaOpa3Jmcm2wy1Iaaf5kau0M/Y4iXad/E4IaTiYjBSvXhQF5N5VifKAL2qP+i/50S1Q4G7WTC1VWH1MDMKlx2Q7EyWbCaUI7m+sknh1el/O66p8E84Wckp3hOmyECfVEoce/MStptJJztJkpY1cZaJUUxNhV6N1CsWUyroVyPZmjbGodcYLvas30REiRbL1zQkGn0TvDpAo5CncAt6YMHPa5HHgOb5Q5C2HTtug9h2vIHn9jZicy6HmCWKauI6uFn3AlTSRsAiUdTbaSWoDqosFxHnZKux3H/i1cvNfjosc3we+dEDY5d5xZN9l6QkEb4V1caZwjX1dCRbkf3+14H3Q7jhQ7HMAHWL4aLJpS0lxaMo3BtJRwGBqKZKY5DaocrWIGJLaFuE6USULNKp7i0L7+TL6e967TuxbMGX7ZqSjhK/OeecD8mzNl/L0PThcE4BECvB/wgrcdPHpztpSfXXr/xa3lJeLsw22Xf59fzx4/3lH+1q4XwPRhIYejrIgGYZGnXSt+s1Tcv+kL7vITNTNrEvPPp354+fNde1zODU998yFeu6Nvm8dX/8YHr0dOpq8s6PkodGnfa7u2/3bQ+G7Otp9dM442v9i9+9xPm2uv9Ow7Epz7S9+sM5uu37ivx6Me6oeHq9GqslDZib71vVtnnTeW8Id27t1xasGv108vjP04zS4/64s2PVnk+3j7hXPvXd18vv/s894DZxbHWqc+u7DinWt1xz69sUJsPt13aclze07trNz9wMNbGqOxq/pJQ+p/5eqf875qWvTJq5Vtmf4DF9DcZMtL379NHp/ZOa8js2hq7YKTyru+3Rfdxw509dSkFzbuvfZI88Gt644mSr/d0fJlpXniafbKjJr9Wwa28S9AiebKcRMAAA=="
          };
      return res;
    });
    next();
  }
}
