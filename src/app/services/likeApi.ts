import { api } from './api';
import type { Like } from '../types';

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: (likeData) => ({
        url: '/likes',
        method: 'POST',
        body: likeData,
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;

export const {
  endpoints: { likePost, unlikePost },
} = likeApi;
