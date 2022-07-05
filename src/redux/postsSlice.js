import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const postsSlice = createSlice({
  name: 'posts',
  initialState, 
  reducers: {
    addPost: (state, action) => {
      //add supabase query or realtime listener
    },
    deletePost: (state, action) => {
      //delete post for current user
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
