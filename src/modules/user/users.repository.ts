import {
    ConflictException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

export class UsersRepository extends Repository<Users> {
    async findOneById(id: number): Promise<Users> {
        return this.findOneBy({id: id});
    }
}