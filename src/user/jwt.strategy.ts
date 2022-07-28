import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import {PassportStrategy}  from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import {ExtractJwt,Strategy}  from 'passport-jwt'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'

export interface JwtPaload{
  userName: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>
  ){
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPaload): Promise<UserEntity>{
    const {userName} = payload
    const user = await this.user.findOne({ userName})
    if(!user){
      throw new UnauthorizedException()
    }
    return user
  }
}