import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  currentUsername: "",
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
    currentUsername: (state, action)=> {
      return {...state, currentUsername: action.payload}
    },
    logoutCurrentUser: () => {
      //remove formerly auth user
      return { currentUser: {}, isLoggedIn: false };
    },
  },
});

export const { fetchUsers, currentUser, currentUsername, logoutCurrentUser } =
  usersSlice.actions;
export default usersSlice.reducer;
