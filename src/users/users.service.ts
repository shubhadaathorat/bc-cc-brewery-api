import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssociationService } from '../association/association.service';
//import { Country } from './entities/countries.entity';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}
  
  @Inject(AssociationService)
  private readonly AssociationService: AssociationService;

  async findOne(id: number) {
    return this.userRepository.findOneBy({id: id});
  }
  
  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async login(loginDto: loginDto){
    const userData = await this.findByUsername(loginDto.username);
    if (!userData || userData.user_password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const userAssociation = userData.association;
    const associationData = await this.AssociationService.findOne(userAssociation);
    console.log(`associationData ${JSON.stringify(associationData)}`);

    const payload = {
      status: 'success',
      code: '200',
      data: {
        userInfo: {
          id: userData.id,
          username: userData.username,
          emailId: userData.email,
        }
      } 
    };
    return payload;
  }

}
