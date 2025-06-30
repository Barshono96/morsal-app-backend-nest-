import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FeedbacksService {
    constructor(private prisma: PrismaService) { }

    async insertFeedback( res) {
        try {
            const filePath = path.join(__dirname, '../../src/data/feedbacks.json');
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const feedbacks = JSON.parse(rawData);

            for (const f of feedbacks) {
                const exists = await this.prisma.feedback.findFirst({
                    where: { email: f.email, message: f.feedback },
                });
                if (!exists) {
                    await this.prisma.feedback.create({
                        data: {
                            name: f.name,
                            email: f.email,
                            message: f.feedback,
                            createdAt: new Date(f.date),
                        },
                    });
                }
            }
            res.status(200).json({ message: 'Feedbacks inserted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to insert feedbacks' });
        }
    }

    async getFeedbacks(query, res) {
        try {
            const { page = '1', limit = '10', date, name, email } = query;
            const currentPage = Number(page);
            const pageLimit = Number(limit);
            const skip = (currentPage - 1) * pageLimit;

            const orderBy: any = {};
            if (date) orderBy.createdAt = date === 'asc' ? 'asc' : 'desc';
            if (name) orderBy.name = name === 'asc' ? 'asc' : 'desc';
            if (email) orderBy.email = email === 'asc' ? 'asc' : 'desc';

            const [feedbacks, totalFeedbacks] = await Promise.all([
                this.prisma.feedback.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        message: true,
                        createdAt: true,
                    },
                    skip,
                    take: pageLimit,
                    orderBy,
                }),
                this.prisma.feedback.count(),
            ]);

            const totalPages = Math.ceil(totalFeedbacks / pageLimit);

            res.json({
                data: feedbacks,
                pagination: {
                    totalFeedbacks,
                    totalPages,
                    currentPage,
                    pageLimit,
                },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch feedbacks' });
        }
    }

    async deleteFeedback(id: string, res) {
        try {
            const feedback = await this.prisma.feedback.findUnique({
                where: { id: parseInt(id) },
            });
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
            await this.prisma.feedback.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({
                message: 'Feedback deleted successfully',
                feedback,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Delete failed' });
        }
    }
}