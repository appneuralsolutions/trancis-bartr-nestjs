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
import { PurchaseCardDto } from './dto/purchase_card.dto';
import { PurchaseCard } from './interface/purchase_card.interface';
import { PurchaseCardService } from './purchase_card.service';
import { PurchaseCardSchema } from './schema/purchase_card.schema';
import { ResponseSuccess } from 'src/shared/@dtos/response.dto';
import { ResponseError } from './../../shared/@dtos/response.dto';
import { JwtService } from '@nestjs/jwt';
import { Me } from '../@decorators/me.decorator';
import { ErrorMessage } from '../../shared/@constants/error.constant'
@ApiTags('Me -> PurchaseCard')
@ApiBearerAuth()

@Controller('purchase-card')
export class PurchaseCardController {
    constructor(
        private readonly PurchaseCardService: PurchaseCardService,
        private jwtService: JwtService,
    ) { }

    @Post()
    async create(
        @Body() PurchaseCardDto: PurchaseCardDto,
        @Me() me: string,
    ): Promise<IResponse | PurchaseCard> {

        const userPayload: any = this.jwtService.decode(me);
        console.log("payload",userPayload)
        const data = await this.PurchaseCardService.create(
            PurchaseCardDto,
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
        const data = await this.PurchaseCardService.findMy(userPayload);
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
        @Body() PurchaseCardDto: PurchaseCardDto,
        @Param('id') id: string,
        @Me() me: string,
    ): Promise<IResponse> {
        const userPayload: any = this.jwtService.decode(me);
        const data = await this.PurchaseCardService.update(
            id,
            PurchaseCardDto,
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
        const data = await this.PurchaseCardService.remove(id);
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
