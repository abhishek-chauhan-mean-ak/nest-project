import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService){}
  async registerUser(registerDto: RegisterDto) {
    console.log('registerDto', registerDto);
    const slatRounds = 10;
    // Hash Password
    const hashPassword = await bcrypt.hash(registerDto.password, slatRounds);
    const user = await this.userService.createUser({ ...registerDto, password: hashPassword });
    return user;
  }
}
