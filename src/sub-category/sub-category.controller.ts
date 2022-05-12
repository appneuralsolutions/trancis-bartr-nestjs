import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sub-category')
@Controller()
export class SubCategoryController {


    @Post()
    createSubCategory(){

    }

    @Get(':category')
    getSubCategory(){

    }

    @Put()
    updateSubCategory(){

    }

    @Delete()
    deleteSubCategory(){
        
    }


}
