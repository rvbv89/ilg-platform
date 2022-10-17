import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/init';
import { useDispatch } from 'react-redux/es/exports';
import {
  currentUser,
  currentUsername,
  logoutCurrentUser,
} from '../redux/usersSlice';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux/es/exports';
import { decode } from 'base64-arraybuffer';
import useRegisterUser from '../hooks/useRegisterUser';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // TODO revisit
  // const [authStatus, setAuthStatus] = useState(
  //   localStorage.getItem('authStatus') || false
  // );
  // let { isLoggedIn } = useSelector(state => state.users.isLoggedIn);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [resetEmailVal, setResetEmailVal] = useState();
  //Define dispatch var
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, [user]);

  //Listen to auth changes

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
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
      console.log(password);
      if (error) {
        console.log(error);
        alert(error.message);
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(currentUser(user));
        let username = user.user_metadata.username;
        dispatch(currentUsername(username));
      }
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setIsSignedIn(false);
      return;
    } else {
      dispatch(currentUser(user));
      let username = user.user_metadata.username;
      dispatch(currentUsername(username));
      setIsSignedIn(true);
    }
    console.log(isSignedIn);
  }, []);

  // useEffect(()=>{
  //   const fetchUsers = async () => {
  //     let { data, error } = await supabase.
  //   }
  // },[])

  const handleLogout = async () => {
    localStorage.removeItem('user');
    let { error } = await supabase.auth.signOut();
    dispatch(logoutCurrentUser());
    setIsSignedIn(false);
  };

  // Register new user

  const handleRegister = async (username, email, password, avatar) => {
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
      console.log(user);
      const handleAvatarUpload = async (avatar, user) => {
        if (avatar && user !== undefined) {
          const avatarFile = avatar;
          let fileName = user.id;
          console.log(fileName);
          const decodeAvatarFile = decode(avatarFile);
          console.log(decodeAvatarFile);
          const { data, error } = await supabase.storage
            .from('avatars')
            .upload(`public/${fileName}`, avatarFile, {
              cacheControl: '3600',
              upsert: false,
              contentType: 'image/png',
            });
          console.log(error);
        }
      };
      handleAvatarUpload(avatar, user);
      alert('Please check your email for a confirmation link. Thanks!');
      if (error) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  const handleRequestResetPassword = async email => {
    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo: 'https://localhost:3000.com/reset-password-form',
    });
  };

  const handleResetPassword = async (email, password) => {
    const { user, error } = await supabase.auth.update({
      email: email,
      password: password,
    });
    setResetEmailVal('');
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onRequestResetPassword: handleRequestResetPassword,
    onResetPassword: handleResetPassword,
    email: resetEmailVal,
    setEmail: setResetEmailVal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
