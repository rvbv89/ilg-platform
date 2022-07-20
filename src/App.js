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
import { addAllPosts } from './redux/postsSlice';
import { supabase } from '../src/supabase/init';

function App() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { data, error, isLoading } = useFetchMessagesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      let { data: messages, error } = await supabase.from('messages').select("*");
      console.log(messages);
      dispatch(addAllPosts(messages))
      if (error) {
        console.log(error)
      }
    };
    fetchPosts()
  },[]);

  useEffect(() => {
    const postsListener = supabase
      .from('messages')
      .on('*', payload => {
        dispatch(addAllPosts(payload));
        console.log(payload);
      })
      .subscribe();

    return () => {
      postsListener.unsubscribe();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route
          path="auth"
          element={
            <ProtectedRoute>
              <AppAuth />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
