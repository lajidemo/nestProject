import { IsNotEmpty } from "class-validator";

export class CreatePostsDto {
  @IsNotEmpty({message: '标题不能为空'})
  title: string;

  @IsNotEmpty({message: '内容不能为空'})
  content: string;
}

export class UpdatePostDto {
  @IsNotEmpty({message: 'Id不能为空'})
  id: number;
  
  title: string;

  content: string;
}

export class SearchPostDto {
  title: string;

  content: string;
}