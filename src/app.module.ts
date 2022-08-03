import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { HahahaModule } from './hahaha/hahaha.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwe123.',
      database: 'a_blog',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    PostsModule,
    UserModule,
    HahahaModule,
  ],
})
export class AppModule {}
