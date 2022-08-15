import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import '@fontsource/barlow';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';
import { AuthModal } from './AuthModal';
import { Home } from './Home';
import { AppAuth } from './AppAuth';
import { Register } from './Register';
import { useFetchMessagesQuery } from './redux/supabaseQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAllPosts,
  addNewPost,
  addPostsFromSubscription,
  currentFeed,
} from './redux/postsSlice';
import { supabase } from '../src/supabase/init';
import { getAllOtherUsers, getAllUsers } from './redux/usersSlice';

function App() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { data, error, isLoading } = useFetchMessagesQuery();
  const dispatch = useDispatch();
  let user = useSelector(state => state.users.currentUser);
  let username = useSelector(state => state.users.currentUsername)
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log(event, session.user.user_metadata.username)
  //   let username = session.user.user_metadata.username;
  //   if (username !== user.user_metadata.username){
  //     console.log('current username')
  //   }
  // })

  useEffect(() => {
    if (isLoggedIn === false){
      return
    } else {  
      const fetchUsers = async () => {
      let { data, error } = await supabase.from('users')
      .select('username')
      .not('username', 'eq', username)
      console.log(data);
      dispatch(getAllOtherUsers(data));
      if (error) {
        console.log(error);
      }
    };
    fetchUsers()
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
      // .subscribe();
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
    <ChakraProvider theme={theme}>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
