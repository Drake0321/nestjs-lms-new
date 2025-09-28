import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/resgisterUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerDto: RegisterDto) {
    /*
        1.) Check if email already exists ( Done )
        2.) Hash the password ( Done )
        3.) Store the user in the database ( Done )
        4.) Generate JWT token
        5.) Return the token
        */
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerDto.password, saltRounds);
    const user = await this.userService.createUser({
      ...registerDto,
      password: hash,
    });

    const payload = { sub: user._id ,role:'admin'};
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
