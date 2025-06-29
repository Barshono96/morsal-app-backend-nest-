import { Body, Controller, Post, UseGuards, UseInterceptors, UploadedFile, Req, BadRequestException, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from '../config/multer.config';
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', upload))
    async uploadProfilePicture(@UploadedFile() image: Express.Multer.File, @Req() req) {
        const userId = req.user.userId;
        return this.authService.updateProfilePicture(userId, image, req);
    }
}
