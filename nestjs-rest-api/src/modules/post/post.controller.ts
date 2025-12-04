import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Auth } from '../../common/decorators/auth.decorator';
import { type Request } from 'express';
import { type UserModel } from '../user/user.model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  public constructor(private readonly postService: PostService) {}

  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image,
    @Req() request: Request
  ) {
    return this.postService.createPost(dto, image, (request as unknown as { user: UserModel }).user)
  }
}
