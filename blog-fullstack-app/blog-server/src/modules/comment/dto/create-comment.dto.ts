import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsObjectId } from '../../../decorators/objectId.decorator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @IsObjectId()
  public postId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  public content: string;
}