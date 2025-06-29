// src/food/food.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Category } from '@prisma/client';

@Injectable()
export class FoodService {
    constructor(private prisma: PrismaService) { }

    async createFood(createFoodDto: CreateFoodDto) {
        const { name, category, image } = createFoodDto;
        const validCategory = Object.values(Category).includes(category as Category)
            ? (category as Category)
            : Category.CRAVINGS; 

        return this.prisma.food.create({
            data: {
                name,
                category: validCategory,  // Use the category enum value
                image,
            },
        });
    }

    async getAllFoodItems(page: number, limit: number, category?: Category) {
        const skip = (page - 1) * limit;
        const where = category ? { category } : {};

        const totalCount = await this.prisma.food.count({ where });

        const foods = await this.prisma.food.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'asc' },
        });

        return { totalCount, foods };
    }

    async updateFood(id: string, updateFoodDto: UpdateFoodDto) {
        const food = await this.prisma.food.findUnique({
            where: { id: parseInt(id) },
        });

        if (!food) throw new Error('Food not found');

        // If category is passed as string, convert it to a valid Category enum value
        if (updateFoodDto.category && !Object.values(Category).includes(updateFoodDto.category as Category)) {
            throw new Error('Invalid category');
        }

        const updatedFood = await this.prisma.food.update({
            where: { id: parseInt(id) },
            data: {
                ...updateFoodDto,
                category: updateFoodDto.category ? (updateFoodDto.category as Category) : food.category,  // Ensure category is valid enum
            },
        });

        return { message: 'Food updated successfully', updatedFood }
    }

    async deleteFood(id: string) {
        const food = await this.prisma.food.findUnique({
            where: { id: parseInt(id) },
        });

        if (!food) throw new Error('Food not found');

        await this.prisma.food.delete({
            where: { id: parseInt(id) },
        });

        return { food, message: 'Food deleted successfully' };
    }
}
