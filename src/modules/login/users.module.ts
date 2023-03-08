import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './users.controller';
import { loginService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
    controllers: [LoginController],
    providers: [loginService],
    imports: [TypeOrmModule.forFeature([UsersRepository])],
})
export class loginModule {}