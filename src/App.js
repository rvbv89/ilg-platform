import React, { useState } from 'react';
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
import { MainFeed } from './MainFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';
import { AuthModal } from './AuthModal';
import { AppNoAuth } from './AppNoAuth';
import { AppAuth } from './AppAuth';
import { Register } from './Register';

function App() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<AppNoAuth />} />
        <Route path="register" element={<Register/>} />
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
