import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState, 
  reducers: {
    fetchUsers: (state) => {
      //get all users from supabase
    },
    currentUser: (state) => {
      //set current users
    },
  },
});

export const { fetchUsers, currentUser } = usersSlice.actions;

export default usersSlice.reducer;
