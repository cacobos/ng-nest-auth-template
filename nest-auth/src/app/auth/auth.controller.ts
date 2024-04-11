import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../users/user-dto';
import { UsersService } from '../users/users.service';
import { Public } from '../utils/public-decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: Record<string, string>) {
    return await this.authService.login(loginDto.username, loginDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('refresh')
  async refresh(@Request() req) {
    // recieve old token from headers and send new token
    const oldToken = req.headers['x-token'];
    const user = await this.jwtService.verifyAsync(oldToken);
    const payload = {
      sub: user.sub,
      username: user.username,
      roles: user.roles,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        username: user.username,
        roles: user.roles,
      },
    };
  }

  @Public()
  @Post('signup')
  async signup(@Body() userDto: UserDTO) {
    await this.userService.singup(userDto);
    return 'Successfully signed up with: ' + userDto.username;
  }
}
