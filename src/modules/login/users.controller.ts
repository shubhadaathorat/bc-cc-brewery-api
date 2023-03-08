import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
  } from '@nestjs/common';
import { loginService } from './users.service';

@Controller('login')

export class LoginController {
    constructor(private readonly loginService: loginService) {}

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.loginService.findOne(id);
    }
}