import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import postsReducer from './postsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    //comments obj
  },
});


