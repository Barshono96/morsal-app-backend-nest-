import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async updateProfilePicture(userId: number, image: Express.Multer.File, req: any) {
        if (!image) {
            throw new BadRequestException('Please upload an image file');
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = `${baseUrl}/uploads/${image.filename}`;
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { image: imageUrl },
            select: { id: true, name: true, email: true, role: true, image: true },
        });
        return updatedUser;
    }

    async signup(email: string, password: string, name?: string, role?: string) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) throw new ConflictException('User already exists');
        const hashed = await bcrypt.hash(password, 10);
        // Only include role if provided, otherwise let Prisma use default
        const data: any = { email, password: hashed };
        if (name !== undefined) data.name = name;
        if (role !== undefined && role !== null) data.role = role;
        const user = await this.prisma.user.create({ data });
        return this.generateToken(user);
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');
        return this.generateToken(user);
    }

    generateToken(user: any) {
        const payload = { sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, email: user.email, role: user.role },
        };
    }


}
