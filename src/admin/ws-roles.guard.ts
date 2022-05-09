import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsRolesGuard implements CanActivate {
  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      // const decoded = jwt.verify(bearerToken, 'secret') as any;
      return new Promise((resolve, reject) => {
        // return this.authService.getUser(decoded.userId).then((user) => {
        //   if (user) {
        //     resolve(user);
        //   } else {
        //     reject(false);
        //   }
        // });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
