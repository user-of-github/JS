import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserModel } from '../user/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from './post.model';
import { FileService } from '../file/file.service';
import { CryptoService } from '../utils/crypto.service';

@Injectable()
export class PostService {
  public constructor(
    @InjectModel(PostModel) private readonly postRepository: typeof PostModel,
    private readonly fileService: FileService
  ) {}


  public async createPost(dto: CreatePostDto, image: any, user: UserModel) {
    const fileName = await this.fileService.createFile(image);

    const post = await this.postRepository.create({
      ...dto,
      image: fileName,
      userId: user.id
    });

    return post;
  }
}
