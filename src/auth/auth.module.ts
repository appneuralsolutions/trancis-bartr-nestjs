/* eslint-disable prettier/prettier */
import { SharedModule } from '../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EmailVerificationSchema } from './@schemas/email-verification.schema';
import { ForgottenPasswordSchema } from './@schemas/forgotten-password.schema';
import { UserActivitySchema } from './@schemas/user-activity.schema';
import { UserPersonalSchema } from './@schemas/user-personal.schema';
import { UserMedicalSchema } from './@schemas/user-medical.schema';
import { UserEducationalSchema } from './@schemas/user-educational.schema';
import { UserEmploymentSchema } from './@schemas/user-employment.schema';
import { UserSchema } from './@schemas/user.schema';
import { AuthGateway } from './auth.gateway';
import { ConsentRegistrySchema } from './@schemas/consent-registry.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Consent-Registry', schema: ConsentRegistrySchema },
      { name: 'Email-Verification', schema: EmailVerificationSchema },
      { name: 'Forgotten-Password', schema: ForgottenPasswordSchema },
      { name: 'User-Activity', schema: UserActivitySchema },
      { name: 'User-Personal', schema: UserPersonalSchema },
      { name: 'User-Medical', schema: UserMedicalSchema },
      { name: 'User-Educational', schema: UserEducationalSchema },
      { name: 'User-Employment', schema: UserEmploymentSchema },
      { name: 'User', schema: UserSchema },
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
  controllers: [AuthController],
  providers: [AuthService, AuthGateway],
  exports: [MongooseModule, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
