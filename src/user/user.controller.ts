import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ){}

  @Post('signUp')
  async signUp(@Body() user: UserCreateDto): Promise<UserEntity>{
    return await this.userService.signUp(user)
  }
  
  @Post('signIn')
  async signIn(@Body() user: UserCreateDto):Promise<{accessToken: string}> {
    return await this.userService.signIn(user)
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req){
    console.log('req===',req)
  }
}
