import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostsDto, SearchPostDto, UpdatePostDto } from './posts.dto';
import { PostsEntity } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository
  ) {}

  createPost(postCon: CreatePostsDto, user:UserEntity): Promise<PostsEntity>{
    return this.postsRepository.createPost(postCon,user)
  }

  async getPostsById(id: number): Promise<PostsEntity>{
    const post = await this.postsRepository.findOne(id)
    if(!post) {
      throw new NotFoundException('未找到')
    }
    return post
  }

  async deletePost(id: number): Promise<void>{
    const res = await this.postsRepository.delete(id)
    if(!res.affected){
      throw new NotFoundException('未找到')
    }
  }

  async updatePost(updatePostDto: UpdatePostDto): Promise<PostsEntity>{
    const post = await this.getPostsById(+updatePostDto.id)
    console.log('post===',post)
    post.title = updatePostDto.title
    post.content = updatePostDto.content
    return await this.postsRepository.save({
      ...post,
      updateTime: new Date().toLocaleString(),
    })
  }

  async searchPost(searchPostDto: SearchPostDto,user: UserEntity,): Promise<PostsEntity[]>{
    return this.postsRepository.searchPost(searchPostDto,user)
  }
}
