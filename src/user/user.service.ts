import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto, SignInDto } from 'src/auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    async createUser(registerDto: RegisterDto) {
        try {
            return await this.userModel.create({
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                email: registerDto.email,
                password: registerDto.password
            });
        } catch (error: unknown) {
            const e = error as { code?: number };
            if(e.code === 11000){
                throw new ConflictException('Email is already taken.');
            }
            throw error;
        }
    }

    async getUser(signInDto: SignInDto) {
        try {
            return await this.userModel.findOne( { email: signInDto.email });
        } catch (error) {
            throw error;
        }
    }
}
