import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [FeedbacksService, PrismaService],
  controllers: [FeedbacksController]
})
export class FeedbacksModule {}
