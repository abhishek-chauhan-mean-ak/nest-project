import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService){}
  registerUser(registerDto: RegisterDto): object {
    console.log('registerDto', registerDto);
    return this.userService.createUser();
  }
}
