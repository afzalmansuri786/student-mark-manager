import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    last_name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
