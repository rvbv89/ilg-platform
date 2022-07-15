import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import postsReducer from './postsSlice';
import { supabaseQuery } from './supabaseQuery';

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    [supabaseQuery.reducerPath]: supabaseQuery.reducer,
    //comments obj
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      supabaseQuery.middleware
    ),
});
