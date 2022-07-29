import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/getUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CreatePostsDto, SearchPostDto, UpdatePostDto } from './posts.dto';
import { PostsEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
// 鉴权
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('createPost')
  createPost(
    @Body() createPostsDto: CreatePostsDto,
    @GetUser() user: UserEntity,
  ): Promise<PostsEntity> {
    return this.postsService.createPost(createPostsDto,user);
  }

  @Get('getPostsById/:id')
  getPostsById(@Param('id') id: number): Promise<PostsEntity> {
    return this.postsService.getPostsById(id);
  }

  @Post('deletePost')
  deletePost(@Body() id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @Post('updatePost')
  updatePost(@Body() updatePostDto: UpdatePostDto): Promise<PostsEntity> {
    return this.postsService.updatePost(updatePostDto);
  }

  @Post('searchPost')
  searchPost(@Body() searchPostDto: SearchPostDto,
  @GetUser() user: UserEntity,): Promise<PostsEntity[]> {
    return this.postsService.searchPost(searchPostDto,user);
  }
}
