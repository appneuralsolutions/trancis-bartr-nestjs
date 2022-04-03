import { EmailService } from './email.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class SharedModule {}
