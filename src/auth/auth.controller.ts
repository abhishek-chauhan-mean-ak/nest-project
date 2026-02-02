import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SignInDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth') // prefix - /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Post('register') // - /auth/register
  async register(@Body() registerUserDto: RegisterDto) {
    const createdUser = await this.authService.registerUser(registerUserDto);
    return createdUser;
  }

  @Post('signin') // - /auth/signin
  async signIn(@Body() signInUserDto: SignInDto){
    return await this.authService.signInUser(signInUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile') // - /auth/profile
  async getProfile(@Request() req){
    const userId = req.user.sub;
    return await this.authService.getUserProfile(userId);
  }
}
