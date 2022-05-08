export enum Permission {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}

export interface IRole {
  name: string;
  privileges: {
    [key: string]: [Permission];
  };
}

export interface IJwtPayload {
  userId: string;
  email: string;
  roles: [IRole];
}
