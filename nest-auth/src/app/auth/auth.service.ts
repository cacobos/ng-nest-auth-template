import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) throw new NotFoundException({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = {
      sub: user._id,
      username: user.username,
      roles: user.roles,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    return {
      accessToken: `Bearer ${accessToken}`,
      user: {
        username: user.username,
        roles: user.roles,
      },
    };
  }
}
