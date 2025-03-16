import { ResponseUser, ResponseUserFull } from '../../../types/ResponseUser';

export interface UserDetailsResponseDto extends ResponseUserFull {
  isFollowing: boolean;
}