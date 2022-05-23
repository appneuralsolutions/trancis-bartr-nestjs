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
          'v^1.1#i^1#r^0#f^0#p^1#I^3#t^H4sIAAAAAAAAAOVYe2wURRjv9QWVl3+QggRis5hoxd2bvfet3MXrA7mktKVX+ootzu3O9rbd2z12Zrm7AFoLIkKiIT4CJGDVkOAfxCriIwYwgcSkIdEofyAhqDFREiiaqGjRqLN3pVwrQmnP2MT757Iz3/fN9/vN95gZ0Fda9uD21dt/mWebVTjQB/oKbTZ+DigrLVkxv6hwSUkByBGwDfTd11fcX3RxJYZxNSE0IZzQNYwqUnFVw0JmMMCYhiboECtY0GAcYYGIQiS0pk5wcEBIGDrRRV1lKsI1AUaWoy63F8qiywc9bt5JR7XrNpv1AIMg8rrdbuSToEt0uvx0HmMThTVMoEYCjAM4HCxwsw6+GfgEl18APo73uDuYihZkYEXXqAgHmGDGXSGja+T4emtXIcbIINQIEwyHVkUaQuGa2vrmlfYcW8FRHiIEEhOP/6rWJVTRAlUT3XoZnJEWIqYoIowZezC7wnijQui6M1NwP0O12yvLQJIkjxt5ZeQEeaFylW7EIbm1H9aIIrFyRlRAGlFI+naMUjaiPUgko1/11ES4psL6W2tCVZEVZASY2qpQe6ixkQlCHEsqWhMbhQaBBhupamOtuHLJUHZRPB7k90E4ukrW1CjHE5ap1jVJsRjDFfU6qULUZTSRGGcOMVSoQWswQjKx3MmR48EYgaDD2tHsFpokplmbiuKUhYrM5+3pH9MmxFCiJkFjFiZOZPgJMDCRUCRm4mQmEEdjJ4UDTIyQhGC3J5NJLunkdKPb7gCAt7etqYuIMRSHTFbWynUqr9xegVUyUERENbEikHSC+pKigUod0LqZoNPn473+Ud7HuxWcOPq3gRzM9vHpkK/0kKNe0SnyyIdcfi+CjnykR3A0Qu2WHygK02wcGr2IJFQoIlakcWbGkaFIgtMtO5w+GbGSxy+zLr8ss1G35GF5GSGAUDQq+n3/myyZbJxHkGggkq9Az0+Q4xjf4fEka8Ir0hpA9jZftCrV3LrBYTasRmoMhGu0XrVno7o2mWwPTDYVbgq+WlUoM810/fwRYOV6PkhYrWOCpGnBi4h6AjXqqiKmZ9YGOw2pkeZPuspM0+8IUlX6Ny2ooUQinLdynR+Qd1IppgY6rz3qv+hPN0WFraidWagsfUwNwITCWR2IE/W4XYemleskZg2vz3hd8U+CuUL2qJnmuk2ECfVEose/SSsptJJztJlJk1fJtkoKYvIq9G4hmSKZ0kKZnsxRNpXuGMF3tGZqOqRETbV3WkGn0DvDjAo5CjeLW5Gyh30uA57DG0XOQFg3DXrP4Rqs42+z3os0ep4ghq6qyGjhp11J43GTwKiKZlpJzUN1UeAUDzvF/bbj/xYuesRz8g6H3+WbFjYxc5xZP9N6Ql4b4R1caezjX1eCBZkf3287BvptHxTabMALWH4FqCwtWldcNJfBtJRwGGpSVE9xCpQ5WsU0SEwDcb0onYCKUVhqU86dEX/NedcZ6ASLx152yor4OTnPPGDpjZkSfsGieQ4HcDt44HP5ga8DLL8xW8yXFy9sf+CqbeDo3rKdgf3S++KO7Wdff8gD5o0J2WwlBTQICx5PfeNlf1scVxcOBYa/eGzfyEtX9h6I2+pmX2J3nOwrKb3w/eW15ZvW37Pq0K74ad/cJ9tPzK49eP65ntqeT1PPzF763sHU5u9aC15++mpn0/1DR35asG/ZqbTz3LZXNmxtmr/oru7+420XlnQd2FX5x4uzSq4lu9ct/uSdDyO1Pwx3vPV5aPjjwRdiTedfvXRsZOvDX87qfI1/ZPOZ1pPLPtpUdeSzHx+92DJcf2bLnp8P736q+mjlt575NW9sPjU02LslWPjE5dq3yyuvLN/d1pz8s/xQ17Xhoa9PbBSeP9u5c86u6gL79pH9Hq1jz+/7wWAXOnnv3V+NPHv53W0X4ws3tcqHrx5fcHiwK1L35khP++nsNv4F0lirCnETAAA=',
      };
      return res;
    });
    next();
  }
}
