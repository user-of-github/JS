import { ResponseUser, ResponseUserFull } from '../../../types/server/responses/ResponseUser';

export interface UserDetailsResponseDto extends ResponseUserFull {
  isFollowing: boolean;
}