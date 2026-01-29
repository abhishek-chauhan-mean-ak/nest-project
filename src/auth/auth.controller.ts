import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

@Controller('auth') // prefix - /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Post('register') // - /auth/register
  async register(@Body() registerUserDto: RegisterDto) {
    const slatRounds = 10;
    console.log('register user dto', registerUserDto);

    // Hash Password
    const hashPassword = await bcrypt.hash(registerUserDto.password, slatRounds);

    const result = this.authService.registerUser({ ...registerUserDto, password: hashPassword });
    return result;
  }
}
