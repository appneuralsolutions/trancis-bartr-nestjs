import { MongoExceptionFilter } from './../shared/@filters/mongo-exception.filter';
import { UserAuthSchema } from './@schemas/user-auth.schema';
import { UserEducationalSchema } from './@schemas/user-educational.schema';
import { UserEmploymentSchema } from './@schemas/user-employment.schema';
import { UserMedicalSchema } from './@schemas/user-medical.schema';
import { UserProfileSchema } from './@schemas/user-profile.schema';
import { AllExceptionsFilter } from './../shared/@filters/all-exception.filter';
import { ForgottenPasswordSchema } from './@schemas/forgotten-password.schema';
import { EmailVerificationSchema } from './@schemas/email-verification.schema';
import { ConsentRegistrySchema } from './@schemas/consent-registry.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { AuthUserSchema } from './@schemas/user.schema';
import { NewUserSchema } from './@schemas/new-user.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Consent-Registry', schema: ConsentRegistrySchema },
      { name: 'Email-Verification', schema: EmailVerificationSchema },
      { name: 'Forgotten-Password', schema: ForgottenPasswordSchema },
      { name: 'User-Educational', schema: UserEducationalSchema },
      { name: 'User-Employment', schema: UserEmploymentSchema },
      { name: 'User-Medical', schema: UserMedicalSchema },
      { name: 'User-Profile', schema: UserProfileSchema },
      { name: 'User-Auth', schema: UserAuthSchema },
      { name: 'User', schema: AuthUserSchema },
      { name: 'NewUser', schema: NewUserSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: 1 * 86400 },
    }),
  ],
  providers: [AuthService, AuthGateway],
  controllers: [AuthController],
  exports: [SharedModule, AuthService, AuthGateway],
})
export class AuthModule {}
