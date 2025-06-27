import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';


export class FoodService {
    constructor(private prisma: PrismaService) { }

    async createFoodItem(dto: CreateFoodItemDto) {
        return this.prisma.foodItem.create({
            data: dto,
        });
    }

    async getAllFoodItems() {
        return this.prisma.foodItem.findMany();
    }

    async getFoodItemById(id: string) {
        return this.prisma.foodItem.findUnique({ where: { id } });
    }
}