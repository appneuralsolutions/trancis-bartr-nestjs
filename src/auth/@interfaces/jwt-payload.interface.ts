import { IRole } from './auth-user.interface';

export interface IJwtPayload {
  userId: string;
  email: string;
  roles: [IRole];
}
