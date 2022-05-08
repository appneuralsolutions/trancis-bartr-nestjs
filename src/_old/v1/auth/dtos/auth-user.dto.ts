export class AuthUserDto {
  constructor(object) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.email = object.email;
    this.uname = object.uname;
    this.location = object.location;
    this.dob = object.dob;
    this.phone = object.phone;
    this.jwtToken = object.jwtToken;
    this.isActive = object.isActive;
    // this.privileges = object.privileges;
    this.auth = object.auth;
    // this.roles = object.roles.map((r) => r.name);
  }
  readonly firstName: string;
  readonly lastName: string;
  auth: {};
  email: string;
  uname: string;
  phone: string;
  dob: string;
  location: string;

  isActive: boolean;
  jwtToken: string;
  // roles: string[];
  // privileges: any;
}
