import { EntityRepository, Repository } from 'typeorm';
import { CreatePostsDto, SearchPostDto } from './posts.dto';
import { PostsEntity } from './posts.entity';

@EntityRepository(PostsEntity)
export class PostsRepository extends Repository<PostsEntity> {
  async createPost(createPostsDto: CreatePostsDto): Promise<PostsEntity> {
    const post = this.create({
      ...createPostsDto,
      createTime: new Date().toLocaleString(),
    });
    await this.save(post);
    return post;
  }

  async searchPost(searchPostDto: SearchPostDto): Promise<PostsEntity[]> {
    // 精准查询
    // const res = await this.find(searchPostDto)
    // const res = await this.find({select: ['title']})
    // const res = await this.find({join: {
    //   alias: 'user',
    //   leftJoinAndSelect: {
    //     userName: 'user.userName'
    //   }
    // }})

    // 模糊查询
    const { title, content } = searchPostDto;
    const query = this.createQueryBuilder('post');
    // where 表达式
    if(title){
      query.where(
        'post.title LIKE :title', {title: `%${title}%`}
      )
    }
    if(content){
      query.orWhere(
        'post.content LIKE :content', {content: `%${content}%`}
      )
    }
    if (title || content) {
      query
        .where('post.title LIKE :title', { title: `%${title}%` })
        .orWhere('post.content LIKE :content', { content: `%${content}%` });
    }

    // having 表达式
    // query.having('post.title LIKE :title',{title: `%${title}%`})

    // orderby 表达式
    // 条件越前面，权重越高
    // query.orderBy('post.id','ASC').addOrderBy('post.updateTime','DESC')

    // groupBy 表达式
    // 去重，根据字段值查询，重复的取第一个
    // query.groupBy('post.title')

    // limit,offset 表达式
    // query.limit(2)
    // query.offset(2)
    const res = await query.getMany();
    console.log('res===', res);
    return res;
  }
}
