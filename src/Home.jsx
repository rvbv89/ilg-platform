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
  SimpleGrid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { PostFeed } from './PostFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';
import { AuthModal } from './AuthModal';

export const Home = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Box
        margin={0}
        minWidth="max-content"
        maxHeight="100%"
        textAlign="center"
        fontSize="xl"
      >

{/* templateColumns="repeat(4, 1fr)" margin={2} p={0} gap={4 */}

        <AuthModal isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
        <Navbar onOpen={onOpen} />
        <SimpleGrid minChildWidth="100px" >
          <GridItem>
            <PostSidebar />
          </GridItem>
          <GridItem >
            <PostFeed />
          </GridItem>
          <GridItem>
            <SocialSidebar />
          </GridItem>
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};
