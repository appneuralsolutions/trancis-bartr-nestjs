import { IsNotEmpty } from "class-validator";
export class CreateSubjectDto {
    user_Id: string
    
    @IsNotEmpty()
    subject: string;
}





