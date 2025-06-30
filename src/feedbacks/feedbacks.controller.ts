import {
    Controller, Delete, Get, Post, UseGuards, Res,
    Query,
    Param,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly feedbacksService: FeedbacksService) { }

    @Post('insertFeedbacks')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    insertFeedbacks(@Res() res) {
        return this.feedbacksService.insertFeedback(res);
    }

    @Get('getFeedbacks')
    getFeedbacks(@Query() query, @Res() res) {
        return this.feedbacksService.getFeedbacks(query, res);
    }

    @Delete('deleteFeedback/:id')
    deleteFeedback(@Param('id') id: string, @Res() res) {
        return this.feedbacksService.deleteFeedback(id, res);
    }
}
