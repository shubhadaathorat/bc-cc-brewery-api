import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from './entities/association.entity';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(Association) private readonly AssociationRepository: Repository<Association>
  ){}

  async findOne(id) {
    return this.AssociationRepository.findOneBy({id: id});
  }
}
