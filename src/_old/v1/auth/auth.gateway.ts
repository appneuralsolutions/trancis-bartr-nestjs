import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { WsAuthGuard } from './ws-auth.guard';

@WebSocketGateway()
export class AuthGateway {
  constructor(private authService: AuthService) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('login')
  login(client: any, payload: any): string {
    return 'Hello world!';
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('deactive')
  deactive(client: any, payload: any): string {
    return 'Hello world!';
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('active')
  active(client: any, payload: any): string {
    return 'Hello world!';
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('logout')
  logout(client: any, payload: any): string {
    return 'Hello world!';
  }
}
