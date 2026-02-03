import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtDto, RegisterDto, SignInDto } from './dto/registerUser.dto';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from './constans';
import bcrypt from 'bcrypt';
const saltRounds = jwtConstants.saltRounds;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}
  async registerUser(registerDto: RegisterDto) {
    console.log('registerDto', registerDto);
    // Hash Password
    const hashPassword = await bcrypt.hash(registerDto.password, saltRounds);
    const user = await this.userService.createUser({ ...registerDto, password: hashPassword });

    // Generate JWT token
    const token = await this.generateToken({ id: user._id, role: user.role })
    console.log('token', token);
    return { accessToken: token };
  }

  async signInUser(signInDto: SignInDto){
    console.log('signInDto', signInDto);

    // check for user exist
    const getUser = await this.userService.getUser(signInDto);

    if(!getUser){
      throw new NotFoundException(`User with email ${signInDto.email} not found`);
    }

    // Compare password
    const validatePass = await bcrypt.compare(signInDto.password, getUser.password);

    if(!validatePass){
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = await this.generateToken({ id: getUser._id, role: getUser.role });
    console.log('token', token);
    return { accessToken: token };
  }

  // getb user profile
  async getUserProfile(userId: string){
    // check for user exist
    const getUser = await this.userService.getUserById(userId);

    if(!getUser){
      throw new NotFoundException(`User not found`);
    }

    return getUser;
  }

  // Generate JWT token
  async generateToken(jwtObj: JwtDto){
    const payload = { sub:  jwtObj.id, role: jwtObj.role };
    return await this.jwtService.signAsync(payload);
  }

}
