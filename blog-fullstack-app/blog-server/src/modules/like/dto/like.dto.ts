import { IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from '../../../decorators/objectId.decorator';

export class LikeDto {
  @IsNotEmpty()
  @IsString()
  @IsObjectId()
  public postId: string;
}