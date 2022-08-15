import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  currentUsername: '',
  isLoggedIn: false,
  allOtherUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllOtherUsers: (state, action) => {
      //get all users from supabase
      return { ...state, allOtherUsers: action.payload}
    },
    currentUser: (state, action) => {
      //set current user
      return { ...state, currentUser: { ...action.payload }, isLoggedIn: true };
    },
    currentUsername: (state, action) => {
      return { ...state, currentUsername: action.payload };
    },
    logoutCurrentUser: () => {
      //remove formerly auth user
      return { currentUser: {}, isLoggedIn: false };
    },
  },
});

export const { getAllOtherUsers, currentUser, currentUsername, logoutCurrentUser } =
  usersSlice.actions;
export default usersSlice.reducer;
