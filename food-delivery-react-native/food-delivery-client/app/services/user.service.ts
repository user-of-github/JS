import { ApiUrls } from '@/config/api';
import type { User } from '@/types/user.i';
import { request } from '@/services/api/request';

class UserService {
  public async getProfile(): Promise<User> {
    return request<User>({
      url: ApiUrls.profile.path,
      method: 'GET'
    });
  }

  public async toggleFavourite(productId: string): Promise<void> {
    return request({
      method: 'PATCH',
      url: ApiUrls.profile.favourites.toggleById(productId)
    });
  }
}

export const userService = new UserService();
