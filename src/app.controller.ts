import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, Session, Sse } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { interval, map, Observable } from 'rxjs';

@Controller()
export class AppController {
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }

  @Get('session')
  session(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return session;
  }

  @Get('hello-world')
  getHello() {
    return 'hello world';
  }

  @ApiTags('Feeds')
  @Get('feeds')
  getFeeds() {
    return 'hello world';
  }
}
