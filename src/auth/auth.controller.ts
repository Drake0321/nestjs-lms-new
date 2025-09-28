import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/resgisterUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return { token };
  }
  @Post('login')
  async login() {
    return { message: 'User logged in successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);
    return {
      id: user?.id,
      email: user?.email,
      fname: user?.fname,
      lname: user?.lname,
    };
  }
}
