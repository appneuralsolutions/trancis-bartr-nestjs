import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {}
