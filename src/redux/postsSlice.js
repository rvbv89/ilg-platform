import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFeed: 'general',
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
      return { ...state, allPosts: action.payload };
    },
    addNewPost: (state, action) => {
      state.allPosts.push(action.payload)
    },
    addPostsFromSubscription: (state, action) => {
      return { ...state, allPosts: action.payload };
    },
    // **TODO**
    deletePost: (state, action) => {
      //delete post for current user
    },
  },
});

export const {
  currentFeed,
  addAllPosts,
  addNewPost,
  addPostsFromSubscription,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;
