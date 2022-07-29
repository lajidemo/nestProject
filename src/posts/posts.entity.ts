import { Exclude } from "class-transformer";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
  
  @ManyToOne((_)=>UserEntity, user=>user.posts,{eager:false})
  @Exclude({toPlainOnly: true})
  user: UserEntity
}