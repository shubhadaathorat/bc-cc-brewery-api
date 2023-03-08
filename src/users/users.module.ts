import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AssociationModule } from 'src/association/association.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  AssociationModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
