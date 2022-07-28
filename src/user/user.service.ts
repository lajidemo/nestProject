import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ){}

  async signUp(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const { userName, password } = userCreateDto

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    const user  = this.userRepository.create({userName, password: hashPassword});
    return await this.userRepository.save(user)
  }
  async signIn(userCreateDto: UserCreateDto): Promise<{accessToken: string}> {
    const { userName, password } = userCreateDto
    const user = await this.userRepository.findOne({userName})
    if(user && await (bcrypt.compare(password, user.password))){
      // 生成 token
      const payload = {userName}
      const accessToken = await this.jwtService.sign(payload)
      return {accessToken}
    }else{
      throw new UnauthorizedException()
    }
  }
}
