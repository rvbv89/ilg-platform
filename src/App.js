import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/barlow';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import { Home } from './Home';
import { Register } from './Register';
import { useDispatch, useSelector } from 'react-redux';
import { addAllPosts, addNewPost, currentFeed } from './redux/postsSlice';
import { supabase } from '../src/supabase/init';
import { getAllOtherUsers } from './redux/usersSlice';
import { ResetPassword } from './ResetPassword';
import { ResetPasswordForm } from './ResetPasswordForm';

function App() {
  const dispatch = useDispatch();
  let username = useSelector(state => state.users.currentUsername);
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === false) {
      return;
    } else {
      const fetchUsers = async () => {
        let { data, error } = await supabase
          .from('users')
          .select('username')
          .not('username', 'eq', username);
        console.log(data);
        dispatch(getAllOtherUsers(data));
        if (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data: messages, error } = await supabase
        .from('messages')
        .select('*');
      console.log('fetch effect');
      dispatch(addAllPosts(messages));
      if (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentFeed]);

  useEffect(() => {
    const postsListener = supabase
      .from('messages')
      .on('INSERT', payload => {
        console.log('insert listener');
        console.log(payload);
        dispatch(addNewPost(payload.new));
      })
      .subscribe((status, e) => {
        console.log('status', status, e);
        if (status == 'RETRYING_AFTER_TIMEOUT') {
          console.log('retrying subscription');
        } else if (status == 'SUBSCRIBED') {
          console.log('subscribed');
        } else if (status == 'SUBSCRIPTION_ERROR') {
          console.log(status);
        }
      });

    return () => {
      supabase.removeSubscription(postsListener);
    };
  }, []);

  return (
    // <ChakraProvider theme={theme}>\
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password-form" element={<ResetPasswordForm />} />
    </Routes>
    </>
  );
}

export default App;
