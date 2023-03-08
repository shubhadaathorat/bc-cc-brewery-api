import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class loginService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    ) {}

    findOne(id: number) {
        return this.usersRepository.findOneById(id);
    }
}