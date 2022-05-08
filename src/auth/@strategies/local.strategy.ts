import { IUser } from '../@interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(username: string, password: string): Promise<boolean> {
    return this.authService.validateLogin({ username, password });
  }
}
