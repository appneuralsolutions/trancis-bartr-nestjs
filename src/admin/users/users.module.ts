import { AuditSchema } from './schemas/audit.schema';
import { AuthModule } from './../../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from '../../auth/@schemas/user.schema';
import { SingleValidationSchema } from './schemas/single.schema';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Audit-Log', schema: AuditSchema },
      { name: 'single-validation', schema: SingleValidationSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SharedModule, AuthModule, UsersService, MongooseModule],
})
export class UsersModule {}
