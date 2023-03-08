import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { Association } from './entities/association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Association])],
  controllers: [AssociationController],
  providers: [AssociationService]
})
export class AssociationModule {}
