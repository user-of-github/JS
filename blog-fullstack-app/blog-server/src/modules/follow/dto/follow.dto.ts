import { IsObjectId } from '../../../decorators/objectId.decorator';

export class FollowDto {
  @IsObjectId()
  public followingId: string;
}