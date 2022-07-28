import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostsDto, SearchPostDto, UpdatePostDto } from './posts.dto';
import { PostsEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
// 鉴权
@UseGuards(AuthGuard())
export class PostsController {
  constructor(
    private postsService: PostsService
  ){}

  @Post('createPost')
  createPost(@Body() createPostsDto: CreatePostsDto): Promise<PostsEntity>{
    return this.postsService.createPost(createPostsDto)
  }

  @Get('getPostsById/:id')
  getPostsById(@Param('id') id: number): Promise<PostsEntity>{
    return this.postsService.getPostsById(id)
  }

  @Post('deletePost')
  deletePost(@Body() id: number): Promise<void>{
    return this.postsService.deletePost(id)
  }

  @Post('updatePost')
  updatePost(@Body() updatePostDto: UpdatePostDto): Promise<PostsEntity>{
    return this.postsService.updatePost(updatePostDto)
  }

  @Post('searchPost')
  searchPost(@Body() searchPostDto: SearchPostDto): Promise<PostsEntity[]>{
    return this.postsService.searchPost(searchPostDto)
  }
}
