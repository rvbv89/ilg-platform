import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  allUsers: [],
  onlineUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: state => {
      //get all users from supabase
    },
    currentUser: (state, action) => {
      //set current users
      return { ...state, currentUser: { ...action.payload }, isLoggedIn: true };
    },
    logoutCurrentUser: state => {
      //remove formerly auth user
      return { ...state, currentUser: {}, isLoggedIn: false };
    },
  },
});

export const { fetchUsers, currentUser, logoutCurrentUser } =
  usersSlice.actions;
export default usersSlice.reducer;
