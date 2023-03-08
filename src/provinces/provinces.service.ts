import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';
@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province) private readonly provinceRepository: Repository<Province>
  ){}
  
  async findOne(id: number) {
    return this.provinceRepository.findOneBy({id: id});
  }
}
