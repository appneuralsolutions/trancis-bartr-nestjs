import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Room } from '../../models/room.model';
import { ModelType } from 'typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Controller('api/rooms')
export class RoomsController {
  constructor(@InjectModel(Room) private readonly model: ModelType<Room>) {} // <1>

  @Get()
  find(@Query('q') q) {
    // <2>
    if (q) return this.model.find({ name: { $regex: new RegExp(`.*${q}.*`) } });
    else return this.model.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    // <3>
    return this.model.findById(id);
  }

  @Post()
  save(@Body() item: Room) {
    // <4>
    return item._id
      ? this.model.findByIdAndUpdate(item._id, item, { new: true })
      : this.model.create(item);
  }
}
