import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './docs';
import { HttpExceptionFilter } from './exception/http-exception.filter'
import { TransformInterceptor } from './interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局接口前缀
  app.setGlobalPrefix('api')

  // 成功/失败过滤器
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())

  // 验证
  app.useGlobalPipes(new ValidationPipe())

  // 创建文档
  createDocument(app)

  await app.listen(2333);
}
bootstrap();
