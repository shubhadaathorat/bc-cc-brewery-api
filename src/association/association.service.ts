import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociationService {
  findOne(id: number) {
    return `This action returns a #${id} association`;
  }
}
