import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { Association } from './entities/association.entity';
//import { Country } from './entities/countries.entity';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    //@InjectRepository(Association) private readonly associationRepository: Repository<Association>,
    //@InjectRepository(Country) private readonly countryRepository: Repository<Country>
  ){}

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
