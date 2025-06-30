import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';

@Module({
  imports: [AuthModule, FoodModule, FeedbacksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
