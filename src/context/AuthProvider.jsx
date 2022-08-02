import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/init';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {
  currentUser,
  currentUsername,
  logoutCurrentUser,
} from '../redux/usersSlice';
import { set } from 'lodash';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [authStatus, setAuthStatus] = useState(
  //   localStorage.getItem('authStatus') || false
  // );
  let { isLoggedIn } = useSelector(state => state.users.isLoggedIn);
  const [isSignedIn, setIsSignedIn] = useState(false);
  //Define dispatch var
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, [user]);

  //Listen to auth changes

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_OUT') {
        console.log(event);
      } else {
        console.log(event, session.user);
        localStorage.setItem('authStatus', true);
        setUser(session.user.id);
      }
    });
    console.log('auth effect');
  }, []);

  // Login user

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      alert('Please Complete All Fields');
    } else {
      let { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(user));
      
      if (error) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (!user){
      setIsSignedIn(false)
      return
    } else {
      console.log(user)
      setIsSignedIn(true);
      dispatch(currentUser(user));
    }
    console.log(isSignedIn)
  },[user]);

  useEffect(() => {
    if (isSignedIn === false) {
      return;
    } else {
      let user = JSON.parse(localStorage.getItem('user'));
      let username = user.user_metadata.username;
      dispatch(currentUsername(username));
    }
  }, [isSignedIn]);

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    dispatch(logoutCurrentUser());
    setIsSignedIn(false);
    localStorage.removeItem('user');
  };

  const handleRegister = async (username, email, password) => {
    if (!username || !email || !password) {
      alert('Please Complete All Fields');
    } else {
      let { user, error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            username: username,
          },
        }
      );
      if (error) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
