import { IsOptional, IsString } from "class-validator";

export class CreateFoodItemDto {
    @IsString()
    name: string;

    @IsString()
    imageUrl: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    mood?: string;
}