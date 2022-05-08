export class UserDto {
  constructor(object) {
    this.userId = object._id;
    this.email = object.email;
    this.phone = object.phone;
    this.isActive = object.isActive;
    this.privileges = object.privileges;
    this.roles = object.roles.map((r) => r.name);
  }
  readonly userId: string;
  email: string;
  phone: string;
  isActive: boolean;
  roles: string[];
  privileges: any;
}
