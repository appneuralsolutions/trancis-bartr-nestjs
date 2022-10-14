import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import { IResponse } from './../../shared/@interfaces/response.interface';
import { Message } from './../../shared/@constants/messages.constant';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { PurchaseFeedback } from './interface/purchase_feedback.interface';
import { PurchaseFeedbackDto } from './dto/purchase_feedback.dto';
import { PurchaseFeedbackService } from './purchase_feedback.service';
import { JwtService } from '@nestjs/jwt';
import { Me } from '../@decorators/me.decorator';
import { ErrorMessage } from '../../shared/@constants/error.constant'
@ApiTags('Me -> Feedback')
@ApiBearerAuth()

@Controller('purchase-feedback')
export class PurchaseFeedbackController {
    constructor(
        private readonly PurchaseFeedbackService: PurchaseFeedbackService,
        private jwtService: JwtService,
    ) { }

    @Post()
    async create(
        @Body() PurchaseFeedbackDto: PurchaseFeedbackDto,
        @Me() me: string,
    ): Promise<IResponse | PurchaseFeedback> {

        const userPayload: any = this.jwtService.decode(me);
        console.log("payload",userPayload)
        const data = await this.PurchaseFeedbackService.create(
            PurchaseFeedbackDto,
            userPayload,
        );
        if (data) {
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED_MY_FEEDBACK, {
                data,
            });
        } else {
            return new ResponseError(
                ErrorMessage.NOT_SUCCESSFULLY_CREATED_MY_FEEDBACK,
                {},
            );
        }
    }
    @Get()
    async findMy(@Me() me: string): // @Me() me: string
        Promise<IResponse> {
        const userPayload: any = this.jwtService.decode(me);
        const data = await this.PurchaseFeedbackService.findMy(userPayload);
        if (data) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FIND_MY_FEEDBACK, data);
        } else {
            return new ResponseError(
                ErrorMessage.NOT_SUCCESSFULLY_FIND_MY_FEEDBACK,
                {},
            );
        }
    }

    @Put('?')
    async update(
        @Body() PurchaseFeedbackDto: PurchaseFeedbackDto,
        @Param('id') id: string,
        @Me() me: string,
    ): Promise<IResponse> {
        const userPayload: any = this.jwtService.decode(me);
        const data = await this.PurchaseFeedbackService.update(
            id,
            PurchaseFeedbackDto,
            userPayload,
        );
        if (data) {
            return new ResponseSuccess(
                Message.SUCCESSFULLY_UPDATED_MY_FEEDBACK,
                data,
            );
        } else {
            return new ResponseError(
                ErrorMessage.NOT_SUCCESSFULLY_UPDATED_MY_FEEDBACK,
                {},
            );
        }
    }

    @Delete()
    async remove(@Me() me: string, @Param('id') id: string): Promise<IResponse> {
        const data = await this.PurchaseFeedbackService.remove(id);
        if (data) {
            return new ResponseSuccess(
                Message.SUCCESSFULLY_DELETED_MY_FEEDBACK,
                data,
            );
        } else {
            return new ResponseError(
                ErrorMessage.NOT_SUCCESSFULLY_DELETED_MY_FEEDBACK,
                {},
            );
        }
    }
}
