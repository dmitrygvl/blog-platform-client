import { createListenerMiddleware } from '@reduxjs/toolkit';
import { userApi } from '../app/services/userApi';

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem('token', action.payload.token);
    }
  },
});
