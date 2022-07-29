import { PostsEntity } from 'src/posts/posts.entity';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @OneToMany((_)=> PostsEntity, posts=>posts.user,{eager: true})
  // @JoinTable()
  posts: PostsEntity[]
}
