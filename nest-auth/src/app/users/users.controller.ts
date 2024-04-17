import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ROLES } from '../utils/role-decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ROLES('ROLE_ADMIN')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ROLES('ROLE_ADMIN')
  @Delete(':username')
  delete(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }
}
