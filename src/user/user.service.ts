import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/resgisterUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(registerDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerDto.fname,
        lname: registerDto.lname,
        email: registerDto.email,
        password: registerDto.password,
      });
    } catch (error) {
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (error.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
  async getUserById(id:string){
    return await this.userModel.findOne({_id:id});
  }
}
