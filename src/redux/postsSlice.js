import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFeed: 'Main',
  allPosts: [],
  currentFeedPosts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    currentFeed: (state, action) => {
      return { ...state, currentFeed: action.payload };
    },
    addAllPosts: (state, action) => {
      return {...state, allPosts: action.payload}
    },
    deletePost: (state, action) => {
      //delete post for current user
    },
  },
});

export const { currentFeed, addAllPosts, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
