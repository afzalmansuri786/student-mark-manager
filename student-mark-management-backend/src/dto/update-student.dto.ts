import { IsString, IsEmail, Length, IsOptional } from "class-validator";

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    @Length(1, 50)
    first_name?: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    last_name?: string;

}
