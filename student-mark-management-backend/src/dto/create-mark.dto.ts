import { IsInt, IsString, IsPositive, Min, Max, IsNotEmpty } from "class-validator";

export class CreateMarkDto {
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsInt()
    @IsPositive()
    @Min(0)
    @Max(100)
    mark: number;

    @IsInt()
    studentId: number;
}
