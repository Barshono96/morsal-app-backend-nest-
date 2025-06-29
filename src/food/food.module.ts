import { FoodService } from './food.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FoodController } from './food.controller';
import { RolesGuard } from 'src/auth/roles.guard';


@Module({
    imports: [],
    controllers: [FoodController],
    providers: [FoodService, PrismaService, RolesGuard],
    exports: [FoodService],
})
export class FoodModule { }