import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateSubCategoryDTO{
    id:string;
    
    @ApiProperty()
    image:any;

    @ApiProperty()
    @IsNotEmpty()
    subCategoryName:string
}