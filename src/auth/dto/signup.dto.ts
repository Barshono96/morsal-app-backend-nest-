import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class SignupDto {
    @IsEmail()
    email: string;

    
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
