import { Category } from "@prisma/client";
import { IsString,IsEnum  } from "class-validator";


export class CreateFoodDto {
    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsEnum(Category)
    category: Category;
}