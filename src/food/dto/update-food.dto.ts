import { Category } from "@prisma/client";
import { IsOptional, IsString, IsEnum } from "class-validator";


export class UpdateFoodDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsEnum(Category)
    category?: Category;
}