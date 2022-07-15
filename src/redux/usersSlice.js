import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
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
      return { ...state, currentUser: { ...action.payload } };
    },
    logoutCurrentUser: (state) => {
      //remove formerly auth user
    return {...state, currentUser: {} }
    }
  },
});

export const { fetchUsers, currentUser, logoutCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
