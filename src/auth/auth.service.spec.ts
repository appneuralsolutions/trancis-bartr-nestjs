import { AuthGateway } from './auth.gateway';
import { SharedModule } from './../shared/shared.module';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [AuthService, AuthGateway],
      controllers: [AuthController],
    }).compile();

    authService = await moduleRef.resolve(AuthService);
    // authService = module.get<AuthService>(AuthService);
  });

  it('should return true if email is valid"', () => {
    expect(authService.isValidEmail('ajayprajapat@live.com')).toBe(true);
  });

  it('should return object if login data is valid"', async () => {
    const result = await authService.login({
      username: '',
      password: '',
    });
    expect(typeof result).toBe('object');
    expect(Object.keys(result).includes('jwtToken')).toBe(true);
  });

  it('should return object if register data is valid"', async () => {
    const result = await authService.register({
      // name: '',
    });
    expect(typeof result).toBe('object');
  });
  it('should return true if data is valid"', async () => {
    expect(await authService.resetRequest('email')).toBe(true);
  });
  it('should return true if forget password data is valid"', async () => {
    expect(await authService.forgetPassword('email', 'password', 'token')).toBe(
      true,
    );
  });
  it('should return true if reset Password data is valid"', async () => {
    expect(
      await authService.resetPassword('email', 'oldPassword', 'password'),
    ).toBe(true);
  });
  it('should return true if reset Password data is valid"', async () => {
    expect(await authService.logout('email')).toBe(true);
  });
  it('should return true if verify Email Token data is valid"', async () => {
    expect(await authService.verifyEmailToken('email', 'token')).toBe(true);
  });
  // it('should return true if send Email Token data is valid"', async () => {
  //   expect(await authService.sendEmailToken('email')).toBe(true);
  // });
  it('should return string if sign Token is valid"', async () => {
    const result = await authService.signToken({
      userId: '',
      email: '',
      roles: '',
    });
    expect(typeof result).toBe('string');
  });
});
