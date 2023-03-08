import { Controller,Body, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from './dto/login-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(@Body() loginDto: loginDto) {
    return await this.usersService.login(loginDto);
  }
}
