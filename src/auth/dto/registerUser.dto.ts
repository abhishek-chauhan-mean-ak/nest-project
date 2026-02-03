import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString() @IsNotEmpty()
    password: string;

    @IsString() @IsNotEmpty()
    role: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString() @IsNotEmpty()
    password: string;
}

export class JwtDto {
    id: object;
    role: string;
}