import { Controller,Body, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from './dto/login-user.dto'

@Controller('login')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() loginDto: loginDto) {
    return await this.usersService.login(loginDto);
  }
}
