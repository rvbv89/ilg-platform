import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
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

function App() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { data, error, isLoading } = useFetchMessagesQuery();
  const dispatch = useDispatch();

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
        console.log('new message', payload.new);
        dispatch(addNewPost(payload.new));
      })
      .subscribe((status, e) => {
        console.log('status', status, e);
        if (status == 'RETRYING_AFTER_TIMEOUT') {
          console.log('retrying subscription');
        } else if (status == 'SUBSCRIBED') {
          console.log('subscribed');
        }
      });

    return () => {
      supabase.removeSubscription(postsListener);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
