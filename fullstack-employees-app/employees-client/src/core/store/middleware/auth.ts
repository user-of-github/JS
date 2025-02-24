import { createListenerMiddleware } from '@reduxjs/toolkit';
import { AuthApi } from '../../api/auth';
import { jwtTokenLSKey } from '../../constants';


export const authSaveTokenMiddleware = createListenerMiddleware();

authSaveTokenMiddleware.startListening({
  matcher: AuthApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem(jwtTokenLSKey, action.payload.token);
    }
  }
})