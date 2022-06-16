import { createSlice } from '@reduxjs/toolkit';

export const feedSlice = createSlice({
  name: 'feeds',
  initialState: [
    { id: 1, feedName: 'main', posts: [] },
    { id: 2, feedName: 'technology', posts: [] },
    { id: 3, feedName: 'finance', posts: [] },
    { id: 4, feedName: 'crypto', posts: [] },
  ],
  reducers: {
    addPost: (state, action) => {
      //add supabase query or realtime listener
    },
  },
});

export const { addPost } = feedSlice.actions;

export default feedSlice.reducer;
