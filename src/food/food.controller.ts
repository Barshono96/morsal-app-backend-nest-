// src/food/food.controller.ts
import { Controller, Post, Body, Get, Param, Query, Put, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from '../config/multer.config';
import { Category } from '@prisma/client';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) { }

    @Post('createCollection')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', upload))
    async create(@Body() createFoodDto: CreateFoodDto, @UploadedFile() file: Express.Multer.File) {
        createFoodDto.image = file.filename;
        return this.foodService.createFood(createFoodDto);
    }

    @Get('getCollection')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async getCollection(@Query('page') page = 1, @Query('limit') limit = 10, @Query('category') category: Category) {
        return this.foodService.getAllFoodItems(Number(page), Number(limit), category);
    }

    @Put('updateCollection/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', upload))
    async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto, @UploadedFile() file: Express.Multer.File) {
        if (file) updateFoodDto.image = file.filename;
        return this.foodService.updateFood(id, updateFoodDto);
    }

    @Delete('deleteCollection/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async delete(@Param('id') id: string) {
        return this.foodService.deleteFood(id);
    }
}
