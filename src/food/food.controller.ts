import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) { }

    @Post()
    async createFoodItem(@Body() createFoodItemDto: CreateFoodItemDto) {
        return this.foodService.createFoodItem(createFoodItemDto);
    }

    @Get()
    async getAllFoodItems() {
        return this.foodService.getAllFoodItems();
    }

    @Get(':id')
    async getFoodItemById(@Param('id') id: string) {
        return this.foodService.getFoodItemById(id);
    }
}