import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createTime: string;

  @Column()
  updateTime: string;
  
  // @ManyToOne(()=> UserEntity, user=> user.posts)
  // user: UserEntity;
}