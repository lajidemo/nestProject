import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class UserCreateDto {
  @ApiProperty({ description: '用户名'})
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string
  
  @ApiProperty({ description: '密码'})
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // @Matches(
  //   /^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}$/,
  //   { message: '请注意你的密码格式' },
  // )
  password: string
}