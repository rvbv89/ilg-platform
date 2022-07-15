import { createSlice } from '@reduxjs/toolkit';

const initialState = {
currentFeed: {feedId: "main"}
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    currentFeed: (state, action) => {
      return {...state, currentFeed: {...action.payload}}
    },
    addPost: (state, action) => {
      //add supabase query or realtime listener
    },
    deletePost: (state, action) => {
      //delete post for current user
    },
  },
});

export const { currentFeed, addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
