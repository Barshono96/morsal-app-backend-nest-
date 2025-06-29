import { Body, Controller, Post, UseGuards, UseInterceptors, UploadedFile, Req, BadRequestException, Patch,ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Express } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async signup(@Body() signupDto: SignupDto) {
        // Defensive: Only pass name and role if defined, to avoid Prisma issues
        const name = typeof signupDto.name === 'string' && signupDto.name.trim() !== '' ? signupDto.name : undefined;
        const role = signupDto.role ? signupDto.role : undefined;
        return this.authService.signup(signupDto.email, signupDto.password, name, role);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Patch('profile-picture')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
        fileFilter: (req, image, cb) => {
            if (!image.mimetype.match(/^image\//)) {
                return cb(new BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    }))
    async uploadProfilePicture(@UploadedFile() image: Express.Multer.File, @Req() req) {
        const userId = req.user.userId;
        return this.authService.updateProfilePicture(userId, image, req);
    }
}
