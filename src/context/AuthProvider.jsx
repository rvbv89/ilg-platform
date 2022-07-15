import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/init';
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { currentUser, logoutCurrentUser } from "../redux/usersSlice"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(
    localStorage.getItem('authStatus') || false
  );
  const location = useLocation();
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   } else {
  //     const origin = location.state?.from?.pathname || '/auth';
  //     navigate(origin);
  //   }
  // }, [user]);

  // Login user
  const handleLogin = async (email, password) => {
    if (!email || !password) {
      alert('Please Complete All Fields');
    } else {
      let { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      console.log(user);
      dispatch(currentUser(user))
      localStorage.setItem("user", user)

      if (error) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    dispatch(logoutCurrentUser())
    localStorage.removeItem("user")
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
